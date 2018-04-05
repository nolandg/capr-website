import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},
  {name:'login', path: '/login', componentName: 'LoginPage'},
  {name:'aboutUs', path: '/about-us', componentName: 'AboutUsPage'},
  {name:'ourPartners', path: '/our-partners', componentName: 'OurPartners'},
  {name:'contactUs', path: '/contact-us', componentName: 'ContactUs'},
  {name:'posts', path: '/posts', componentName: 'PostsPage'},
  {name:'quizz', path: '/quizz', componentName: 'Quizz'},
  {name:'songForTheEarth', path: '/song-for-the-earth-video', componentName: 'SongForTheEarth'},
  {name:'projects', path: '/projects', componentName: 'ProjectsPage'},
  {name:'roadmap', path: '/roadmap(/:category)', componentName: 'RoadMap'},
  {name:'carbonWise', path: '/carbon-wise-homes(/:category)', componentName: 'CarbonWise'},
  {name:'wrongWithCarbon', path: '/whats-wrong-with-carbon(/:category)', componentName: 'WrongWithCarbon'},
  {name:'calculator', path: '/carbon-wise-footprint-calculator', componentName: 'CalculatorPage', layoutName: 'CalculatorLayout'},

  {name:'admin', path: '/admin', componentName: 'AdminPage'},
  {name:'co2e-calc-admin', path: '/carbon-wise-admin', componentName: 'CO2eCalcAdmin'},
]);
