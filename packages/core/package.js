Package.describe({
  name: "core",
  summary: "CAPR website core",
  version: '0.0.1',
});

Package.onUse(function (api) {

  api.versionsFrom('METEOR@1.5.2');

  api.use([

    'fourseven:scss@4.5.0',

    // vulcan core
    'vulcan:core@1.8.2',

    // vulcan packages
    'vulcan:accounts@1.8.2',
    'vulcan:forms@1.8.2',
  ]);

  api.addAssets([
  ], ['client']);

  api.addAssets([
  ], ['server']);

  api.addFiles([
    'lib/stylesheets/main.scss',
  ], ['client']);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");

});
