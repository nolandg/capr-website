import { getAllowedActivityValues, getAllowedUnitsValues, getUnitValuesForContext, getFuelTypeValues, getVehicleTypeValues } from '../enumerations';
import utils from './utils.js';
import SimpleSchema from 'simpl-schema';
import { getInventoryIdsAffectedByRecord } from '../utils.js';

const errorIfMissing = (name, message, context) => {
  const field = context.field(name);
  let error = false;

  // inserts
  if (!field.operator) {
    if (!field.isSet || field.value === null || field.value === "") error = true;
  }

  // updates
  else if (field.isSet) {
    if (field.operator === "$set" && field.value === null || field.value === "") error = true;
    if (field.operator === "$unset") error = true;
    if (field.operator === "$rename") error = true;
  }

  if(error){
    context.addValidationErrors([{name, type: SimpleSchema.ErrorTypes.REQUIRED, message }]);
    return true;
  }
}

const errorIfDisallowedUnits = (name, unitsContext, message, context) => {
  const allowedValues = getUnitValuesForContext(unitsContext);
  return errorIfDisallowedValue(name, allowedValues, message, context);
}

const errorIfDisallowedValue = (name, allowedValues, message, context) => {
  const field = context.field(name);

  if(allowedValues.indexOf(field.value) === -1){
    context.addValidationErrors([{name, type: SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED, message }]);
    return true;
  }
}

const errorIfNotEqual = (name, value, message, context) => {
  const field = context.field(name);

  if(field.value !== value){
    context.addValidationErrors([{name, type: SimpleSchema.ErrorTypes.VALUE_NOT_ALLOWED, message }]);
    return true;
  }
}

const checkAndAddErrors = (checks, context) => {
  let error = false;

  checks.forEach(({type, field, value, units, message}) => {
    // const field = context.field(name);
    const label = context.validationContext._schema[field].label;
    const fieldValue = context.field(field).value;

    let msg = message;
    if(!msg){
      if(type === 'missing') msg = `You must specifiy ${label}.`;
      if(type === 'units') msg = `"${fieldValue}" are not a valid units for ${label}.`;
    }

    if(type === 'missing') error |= errorIfMissing(field, msg, context);
    if(type === 'units') error |= errorIfDisallowedUnits(field, units, msg, context);
    if(type === 'equal') error |= errorIfNotEqual(field, value, msg, context);
  });

  return error;
}

const schema = {

  _id: {
    type: String,
    optional: true,
    viewableBy: ['members'],
  },

  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['members'],
    onInsert: () => {
      return new Date();
    }
  },

  activity: {
    label: 'Activity',
    type: String,
    allowedValues: getAllowedActivityValues(),
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  label: {
    label: 'Label',
    type: String,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    form: {
      defaultValue: '',
    },
    optional: true,
    custom: function() {
      const activity = this.field('activity').value;
      const checks = [];

      switch(activity){
        case 'vehicle':
          checks.push({type: 'missing', field: 'label', message: 'Vehicle name is a required.'});
          break;
      }

      return !checkAndAddErrors(checks, this);
    },
  },

  startDate: {
    label: 'Start Date',
    type: Date,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  endDate: {
    label: 'End Date',
    type: Date,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  inventoryIds: {
    type: Array,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onEdit: async (modifier, document, currentUser) => {
      return await getInventoryIdsAffectedByRecord({document, ...modifier.$set});
    },
    onInsert: async (document, currentUser) => {
      return await getInventoryIdsAffectedByRecord(document);
    },
    resolveAs: {
      fieldName: 'inventories',
      type: '[Inventory]',
      resolver: async (record, args, context) => {
        if(!record.inventoryIds || !record.inventoryIds.length) return [];
        return await context.Inventories.find({_id: {$in: record.inventoryIds}}).fetch();
      },
      addOriginalField: true
    },
  },
  'inventoryIds.$': {
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  co2e: {
    label: 'CO2e',
    type: Number,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onInsert: (document, currentUser) => { return utils.calcCo2e(document) },
    onEdit: (modifier, document, currentUser) => {
      if(modifier.$set.activity || modifier.$set.data){
        return utils.calcCo2e({document, ...modifier.$set});
      }else{
        return document.co2e;
      }
    },
  },

  dayCount: {
    label: 'Number of days',
    type: Number,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onInsert: (document, currentUser) => { return utils.calcNumberOfDays(document) },
    onEdit: (modifier, document, currentUser) => {
      if(modifier.$set.startDate || modifier.$set.endDate) {
        return utils.calcNumberOfDays({document, ...modifier.$set});
      }else{
        return document.dayCount;
      }
    },
  },

  data: {
    label: 'Emission Data',
    type: Object,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    form: {
      defaultValue: {
        type: '',
        distance: '',
        fuelVolume: '',
        energy: '',
        fuelType: '',
        units: '',
        efficiency: '',
        isRoundTrip: 'true',
        amount: '',
      }
    },
    custom: function() {
      const activity = this.field('activity').value;
      const data = this.field('data').value;
      const checks = [];

      switch(activity){
        case 'electricity':
          checks.push({type: 'missing', field: 'data.energy'});
          checks.push({type: 'missing', field: 'data.units'});
          checks.push({type: 'units', field: 'data.units', units: 'electricity'});
          break;
        case 'natural-gas':
          checks.push({type: 'missing', field: 'data.energy'});
          checks.push({type: 'missing', field: 'data.units'});
          checks.push({type: 'units', field: 'data.units', units: 'natural-gas'});
          break;
        case 'heating-oil':
          checks.push({type: 'missing', field: 'data.amount'});
          checks.push({type: 'missing', field: 'data.units'});
          checks.push({type: 'units', field: 'data.units', units: 'heating-oil'});
          break;
        case 'propane':
          checks.push({type: 'missing', field: 'data.amount'});
          checks.push({type: 'missing', field: 'data.units'});
          checks.push({type: 'units', field: 'data.units', units: 'propane'});
          break;
        case 'flight':
          checks.push({type: 'missing', field: 'data.distance'});
          checks.push({type: 'missing', field: 'data.flightOrigin'});
          checks.push({type: 'missing', field: 'data.flightDestination'});
          checks.push({type: 'missing', field: 'data.isRoundTrip'});
          checks.push({type: 'missing', field: 'data.units'});
          checks.push({type: 'units', field: 'data.units', units: 'flight.distance'});
          break;
        case 'vehicle':
          checks.push({type: 'missing', field: 'data.type' });
          if(data.type === 'distance') {
            checks.push({type: 'missing', field: 'data.distance'});
            checks.push({type: 'missing', field: 'data.units'});
            checks.push({type: 'units', field: 'data.units', units: 'vehicle.distance'});
            if(data.knownEfficiency === 'true'){
              checks.push({type: 'missing', field: 'data.efficiency'});
              checks.push({type: 'missing', field: 'data.efficiencyUnits'});
            }else{
              checks.push({type: 'missing', field: 'data.vehicleType'});
            }
          }else if(data.type === 'fuel-volume') {
            checks.push({type: 'missing', field: 'data.fuelVolume'});
            checks.push({type: 'missing', field: 'data.units'});
            checks.push({type: 'units', field: 'data.units', units: 'vehicle.fuel-volume'});
          }else if(data.type === 'electric') {
            checks.push({type: 'equal', field: 'data.fuelType', value: 'electricity',
              message: 'You specified an electric vehicle type but not electricity as fuel.'});
          }
          if(data.fuelType === 'electricity'){
            checks.push({type: 'equal', field: 'data.type', value: 'electric',
              message: 'You specified electricity as fuel but not an electric vehicle type.'});
          }
          break;
      }

      return !checkAndAddErrors(checks, this);
    }
  },

  'data.type': {
    label: 'Type',
    type: String,
    optional: true,
    allowedValues: ['distance', 'fuel-volume', 'electric'],
  },
  'data.amount': {
    label: 'Amount',
    type: Number,
    optional: true,
  },
  'data.energy': {
    label: 'Energy',
    type: Number,
    optional: true,
  },
  'data.isRoundTrip': {
    label: 'Round Trip',
    type: String,
    optional: true,
    allowedValues: ['true', 'false'],
    form: {defaultValue: 'true'},
  },
  'data.distance': {
    label: 'Distance',
    type: Number,
    optional: true,
  },
  'data.flightOrigin': {
    label: 'Origin',
    type: Object,
    optional: true,
  },
  'data.flightOrigin.lat': {type: Number },
  'data.flightOrigin.lng': {type: Number },
  'data.flightOrigin.text': {type: String },
  'data.flightOrigin.placeId': {type: String },
  'data.flightDestination': {
    label: 'Destination',
    type: Object,
    optional: true,
  },
  'data.flightDestination.lat': {type: Number },
  'data.flightDestination.lng': {type: Number },
  'data.flightDestination.text': {type: String },
  'data.flightDestination.placeId': {type: String },
  'data.fuelVolume': {
    label: 'Fuel Volume',
    type: Number,
    optional: true,
  },
  'data.fuelType': {
    label: 'Fuel Type',
    type: String,
    optional: true,
    allowedValues: getFuelTypeValues(),
  },
  'data.knownEfficiency': {
    label: 'Known Efficiency',
    type: String,
    optional: true,
    allowedValues: ['true', 'false'],
  },
  'data.vehicleType': {
    label: 'Vehicle Type',
    type: String,
    optional: true,
    allowedValues: getVehicleTypeValues(),
  },
  'data.efficiency': {
    label: 'Efficiency',
    type: Number,
    optional: true,
  },
  'data.efficiencyUnits': {
    label: 'Efficiency Units',
    type: String,
    optional: true,
    allowedValues: getUnitValuesForContext('vehicle.efficiency'),
  },
  'data.units': {
    label: 'Units',
    type: String,
    optional: true,
    allowedValues: getAllowedUnitsValues(),
  },

  userId: {
    type: String,
    optional: true,
    control: 'select',
    viewableBy: ['members'],
    insertableBy: ['members'],
    hidden: true,
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: async (record, args, context) => {
        if (!record.userId) return null;
        const user = await context.Users.loader.load(record.userId);
        return context.Users.restrictViewableFields(context.currentUser, context.Users, user);
      },
      addOriginalField: true
    },
  },

};

export default schema;
