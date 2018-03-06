import { getAllowedActivityValues, getAllowedUnitsValues } from './enumerations';
import utils from './utils.js';

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
  },
  'group.id': {
    type: String,
    optional: true,
  },
  'group.label': {
    type: String,
    optional: true,
  },

  data: {
    label: 'Emission Data',
    type: Object,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },
  'data.value': {
    type: Number,
    optional: true,
  },
  'data.units': {
    type: String,
    allowedValues: getAllowedUnitsValues(),
    optional: true,
  },
  'data.data': {
    type: Object,
    optional: true,
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
