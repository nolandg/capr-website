import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},
  // {name:'aboutUs', path: '/about-us', componentName: 'AboutUs'},
]);
