import SimpleSchema from 'simpl-schema';
import { getRecordsAffectingInventory } from '../utils.js';

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

  startDate: {
    type: Date,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  endDate: {
    type: Date,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  homeOccupantCount: {
    type: Number,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  homeArea: {
    type: Number,
    optional: false,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  homeAreaUnits: {
    type: String,
    optional: false,
    allowedValues: ['sqft', 'sqm'],
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  postalCode: {
    type: String,
    optional: false,
    regEx: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
  },

  emissionRecords: {
    type: Array,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
    onEdit: (modifier, document, currentUser) => {
      return getRecordsAffectingInventory({document, ...modifier.$set});
    },
  },
  'emissionRecords.$': {
    type: Object,
    blackbox: true,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['members'],
    editableBy: ['members'],
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
