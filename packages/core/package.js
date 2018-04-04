Package.describe({
  name: "core",
  summary: "CAPR website core",
  version: '0.0.1',
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.5.2');

  api.use([

    'promise',
    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.8.7',

    // vulcan packages
    'vulcan:accounts@1.8.7',
    'vulcan:forms@1.8.7',
    'vulcan:embed@1.8.7',
  ]);

  api.addAssets([
    'lib/assets/images/home.jpg',
    'lib/assets/images/footprint.jpg',
    'lib/assets/images/footprint.png',
    'lib/assets/images/question.jpg',
    'lib/assets/images/question.png',
    'lib/assets/images/roadmap_x.jpg',
    'lib/assets/images/roadmap.jpg',


    'lib/assets/images/adaptation.jpg',
    'lib/assets/images/drawdown.jpg',
    'lib/assets/images/food.jpg',
    'lib/assets/images/homeheating.png',
    'lib/assets/images/offset.jpg',
    'lib/assets/images/reduce.jpg',
    'lib/assets/images/transporter.png',
  ], ['client']);

  api.addAssets([
  ], ['server']);

  api.addFiles([
    'lib/stylesheets/main.scss',
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
