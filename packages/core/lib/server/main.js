import { getSetting } from 'meteor/vulcan:lib';

export * from '../modules/index.js';

const greet = (welcomeMsg) => {
  return function(user, url) {
    const greeting = (user.profile && user.profile.name) ? (`Hello ${user.profile.name},`) : 'Hello,';
    return `
${greeting}

${welcomeMsg}, simply click the link below.
${url}

Thanks.
~ The CAPR Team
`;
  };
}

Accounts.emailTemplates = {
  from: 'CAPR no-reply <no-reply@climateactionpowellriver.earth>',
  siteName: 'Climate Action Powell River',

  resetPassword: {
    subject: (user) => {
      return 'How to reset your CAPR password';
    },
    text: greet('To reset your password'),
  },
  verifyEmail: {
    subject: (user) => {
      return 'How to verify email address';
    },
    text: greet('To verify your account email'),
  },
  enrollAccount: {
    subject: function(user) {
      return 'An CAPR account has been created for you.';
    },
    text: greet('To start using the service.')
  }
};

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
