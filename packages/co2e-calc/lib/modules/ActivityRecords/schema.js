import { getAllowedActivityValues, getAllowedUnitsValues } from './enumerations';
import utils from './utils.js';
import SimpleSchema from 'simpl-schema';

const hashGroupToName = (group) => {
  if(!group) return '';
  if(!group.data) return group.label;

  const data = JSON.stringify(group.data);
  return `${group.label}---${data}`;
}

const errorIfNotPresent = (customThis) => {
  let shouldBeRequired = customThis.field('saleType').value === 1;

  if (shouldBeRequired) {
    // inserts
    if (!customThis.operator) {
      if (!customThis.isSet || customThis.value === null || customThis.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
    }

    // updates
    else if (customThis.isSet) {
      if (customThis.operator === "$set" && customThis.value === null || customThis.value === "") return SimpleSchema.ErrorTypes.REQUIRED;
      if (customThis.operator === "$unset") return SimpleSchema.ErrorTypes.REQUIRED;
      if (customThis.operator === "$rename") return SimpleSchema.ErrorTypes.REQUIRED;
    }
  }
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

  group: {
    label: 'Group',
    type: Object,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    form: {
      defaultValue: {
        name: '',
        label: '',
        data: {},
      }
    },
    onInsert: (document, currentUser) => {
      const group = document.group;
      return {...group, name: hashGroupToName(group) };
    },
    onEdit: (modifier, document, currentUser) => {
      if(modifier.$set && modifier.$set.group) {
        const group = modifier.$set.group;
        return {...group, name: hashGroupToName(group) };
      }else{
        return document.group;
      }
    },
  },
  'group.name': {
    type: String,
    optional: true,
  },
  'group.label': {
    type: String,
    optional: true,
  },
  'group.data': {
    type: Object,
    optional: true,
  },

  data: {
    label: 'Emission Data',
    type: Object,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    form: {
      defaultValue: {
        value: 0,
        units: '',
        valueType: '',
      }
    },
  },
  'data.value': {
    type: Number,
    optional: false,
  },
  'data.valueType': {
    type: String,
    optional: true,
    custom: function(){
      switch(this.field('activity').value){
        case 'vehicle':
          if(this.field('activity').value === 'vehicle') return errorIfNotPresent(this);
          break;
      }
    }
  },
  'data.units': {
    type: String,
    allowedValues: getAllowedUnitsValues(),
    optional: false,
  },
  'data.unitsType': {
    type: String,
    optional: true,
    custom: function(){
      const data = this.field('data').value;

      switch(this.field('activity').value){
        case 'vehicle':
          if(data && data.valueType === 'fuel-volume')
          if(this.field('data').value === 'vehicle') return errorIfNotPresent(this);
          break;
      }
    }
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
