Package.describe({
  name: "co2e-calc",
  summary: "CO2e Calculator",
  version: '0.0.1',
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.5.2');

  api.use([
    'fourseven:scss@4.5.0',
    'vulcan:core@1.8.7',
    'noland:vulcan-semantic-ui',
  ]);

  api.addAssets([
    'lib/assets/images/bc-hydro-bill.png',
    'lib/assets/images/bc-hydro-bill-kwh.png',
    'lib/assets/images/bc-hydro-bill-dates.png',
    'lib/assets/images/offsets.png',
    'lib/assets/images/offsets2.png',
    'lib/assets/images/logo.png',
    'lib/assets/images/bike.jpg',
  ], ['client']);

  api.addAssets([
  ], ['server']);

  api.addFiles([
    'lib/stylesheets/main.scss'
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
