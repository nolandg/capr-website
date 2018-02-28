import { getAllowedActivityValues } from './enumerations';

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
