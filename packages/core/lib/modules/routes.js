import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},
  {name:'login', path: '/login', componentName: 'LoginPage'},
  {name:'aboutUs', path: '/about-us', componentName: 'AboutUsPage'},
  {name:'posts', path: '/posts', componentName: 'PostsPage'},
  {name:'projects', path: '/projects', componentName: 'ProjectsPage'},
  {name:'calculator', path: '/carbon-wise-footprint-calculator', componentName: 'CalculatorPage'},

  {name:'admin', path: '/admin', componentName: 'AdminPage'},
  {name:'co2e-calc-admin', path: '/carbon-wise-admin', componentName: 'CO2eCalcAdmin'},
]);
