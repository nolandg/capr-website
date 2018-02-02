import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},
  {name:'aboutUs', path: '/about-us', componentName: 'AboutUsPage'},
  {name:'posts', path: '/posts', componentName: 'PostsPage'},
  {name:'projects', path: '/projects', componentName: 'ProjectsPage'},
  {name:'calculator', path: '/carbon-wise-footprint-calculator', componentName: 'CalculatorPage'},
]);
