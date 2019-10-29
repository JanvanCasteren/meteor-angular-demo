import {UserRoles} from '../../../imports/types/user-roles';
import {Roles} from 'meteor/alanning:roles';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {UserTypes} from '../../../imports/types/user-types';

export function createRoles() {
  Roles.createRole(UserRoles.Admin, {unlessExists: true});
  Roles.createRole(UserRoles.Editor, {unlessExists: true});
  Roles.createRole(UserRoles.Viewer, {unlessExists: true});
}

export function createFirstUser() {
  if (Meteor.users.find().count() === 0) {
    const id = Accounts.createUser({
      username: 'meteoradmin',
      email: 'admin@somewhere.com',
      password: 'asdf1234'
    });

    Meteor.users.update(id, {
      $set: {
        userType: UserTypes.Admin,
      }
    });

    Roles.addUsersToRoles(id, [UserRoles.Admin, UserRoles.Editor, UserRoles.Viewer]);
  }
}
