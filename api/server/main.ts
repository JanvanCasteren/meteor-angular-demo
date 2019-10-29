import './imports/methods/organisation-methods';
import './imports/methods/user-methods';
import './imports/publications/publications';
import '../imports/methods';
import {createFirstUser, createRoles} from './imports/services/users.service';

Meteor.startup(() => {
  createRoles();
  createFirstUser();
});
