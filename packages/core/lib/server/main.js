import { getSetting } from 'meteor/vulcan:lib';

export * from '../modules/index.js';
console.log('Google: ', getSetting('googleOAuthClientId'));

ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      loginStyle: 'popup',
      clientId: getSetting('googleOAuthClientId'),
      secret: getSetting('googleOAuthSecret'),
    }
  }
);
ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle: 'popup',
      appId: getSetting('facebookOAuthAppId'),
      secret: getSetting('facebookOAuthSecret'),
    }
  }
);
ServiceConfiguration.configurations.upsert(
  { service: 'twitter' },
  {
    $set: {
      loginStyle: 'popup',
      consumerKey: getSetting('twitterOAuthConsumerKey'),
      secret: getSetting('twitterOAuthSecret'),
    }
  }
);
