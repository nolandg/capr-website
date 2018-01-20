import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},
  {name:'aboutUs', path: '/about-us', componentName: 'AboutUs'},
  {name:'posts', path: '/posts', componentName: 'Posts'},
  {name:'projects', path: '/projects', componentName: 'Projects'},
  {name:'calculator', path: '/carbon-wise-footprint-calculator', componentName: 'Calculator'},
]);
