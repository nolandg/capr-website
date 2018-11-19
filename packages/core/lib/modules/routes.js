import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {name:'home', path: '/', componentName: 'HomePage'},

  {name:'media', path: '/media-reports', componentName: 'MediaPage'},
  {name:'localIssues', path: '/local-issues', componentName: 'LocalIssuesPage'},
  {name:'analysis', path: '/analysis-opinion', componentName: 'AnalysisPage'},
  {name:'climateScience', path: '/climate-science', componentName: 'ClimateSciencePage'},

  {name:'books', path: '/books-on-climate-change', componentName: 'BooksPage'},
  {name:'movies', path: '/movies-on-climate-change', componentName: 'MoviesPage'},
  {name:'links', path: '/links', componentName: 'LinksPage'},
  {name:'coolApps', path: '/cool-apps', componentName: 'CoolAppsPage'},
  {name:'cartoons', path: '/cartoons', componentName: 'CartoonsPage'},
  {name:'photos', path: '/photos', componentName: 'PhotosPage'},

  {name:'login', path: '/login', componentName: 'LoginPage'},
  {name:'whatsNew', path: '/whats-new', componentName: 'WhatsNewPage'},
  {name:'calendar', path: '/calendar', componentName: 'CalendarPage'},
  {name:'newsletter', path: '/newsletter', componentName: 'NewsletterPage'},
  {name:'newsReleases', path: '/news-releases', componentName: 'NewsReleases'},
  {name:'history', path: '/history', componentName: 'HistoryPage'},
  {name:'directors', path: '/directors', componentName: 'DirectorsPage'},
  {name:'aboutUs', path: '/about-us', componentName: 'AboutUsPage'},
  {name:'ourPartners', path: '/our-partners', componentName: 'OurPartners'},
  {name:'contactUs', path: '/contact-us', componentName: 'ContactUsPage'},
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
