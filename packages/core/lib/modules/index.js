import Users from 'meteor/vulcan:users';

import './fragments.js';
import './components.js';
import './config.js';
import './routes.js';
import './headtags.js';
import './i18n.js';
import './redux.js';

Users.groups.adminTier2.can('core.admin');
