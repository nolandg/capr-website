import { addAction, addReducer } from 'meteor/vulcan:core';

// register messages actions
addAction({
  ui: {
    toggleSidebar() { return { type: 'TOGGLESIDEBAR',}; },
    showSidebar() { return { type: 'SHOWSIDEBAR',}; },
    hideSidebar() { return { type: 'HIDESIDEBAR',}; },
  }
});

// register messages reducer
addReducer({
  ui: (state = {showSidebar: false}, action) => {
    switch(action.type) {
      case 'TOGGLESIDEBAR':
        return {
          ...state,
          showSidebar: !state.showSidebar
        };
      case 'SHOWSIDEBAR':
        return {
          ...state,
          showSidebar: true
        };
      case 'HIDESIDEBAR':
        return {
          ...state,
          showSidebar: false
        };
      default:
        return state;
    }
  },
});
