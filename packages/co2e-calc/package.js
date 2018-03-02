Package.describe({
  name: "co2e-calc",
  summary: "CO2e Calculator",
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
    'vulcan:email@1.8.7',
    'vulcan:forms@1.8.7',
    'vulcan:embed@1.8.7',

  ]);

  api.addAssets([
    'lib/assets/images/bc-hydro-bill.png',
    'lib/assets/images/bc-hydro-bill-kwh.png',
    'lib/assets/images/bc-hydro-bill-dates.png',
  ], ['client']);

  api.addAssets([
  ], ['server']);

  api.addFiles([
    'lib/stylesheets/main.scss'
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
