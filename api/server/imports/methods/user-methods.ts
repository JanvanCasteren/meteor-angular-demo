import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {UserRoles} from '../../../imports/types/user-roles';
import {Roles} from 'meteor/alanning:roles';
import {check} from 'meteor/check';
import {Users} from '../../../imports/collections/users';
import {NewUser} from '../../../imports/models/new-user.model';
import {insertValidator} from '../../../imports/validators/schema-validator';
import {NewUserSchema} from '../../../imports/models/new-user.schema';
import {NewAdminUserSchema} from '../../../imports/models/new-admin-user.schema';
import {UserTypes} from '../../../imports/types/user-types';
import {checkAdmin} from '../../../imports/helpers/authorisation-helpers';
import {checkString} from '../../../imports/helpers/validation-helpers';

const userInsertValidator = insertValidator(NewUserSchema);
const adminUserInsertValidator = insertValidator(NewAdminUserSchema);

function addUser(newUser: NewUser, type: string) {
  if (type === UserTypes.Admin) {
    delete newUser.organisationId;
    adminUserInsertValidator(newUser);
  } else {
    userInsertValidator(newUser);
  }

  const id = Accounts.createUser(newUser);

  // note: since userType is not a default property, it will not be added
  // through Accounts.createUser, we have to add it through an update
  if (type === UserTypes.Admin) {
    Meteor.users.update(id, {
      $set: {
        name: newUser.name,
        userType: newUser.userType,
      }
    });
  } else {
    Meteor.users.update(id, {
      $set: {
        name: newUser.name,
        userType: newUser.userType,
        organisationId: newUser.organisationId
      }
    });
  }

  switch (type) {
    case UserTypes.Admin:
      Roles.addUsersToRoles(id, [UserRoles.Admin, UserRoles.Editor, UserRoles.Viewer]);
      break;
    case UserTypes.Editor:
      Roles.addUsersToRoles(id, [UserRoles.Editor, UserRoles.Viewer]);
      break;
    case UserTypes.Viewer:
      Roles.addUsersToRoles(id, [UserRoles.Viewer]);
      break;
  }

  return id;
}

function removeUser(id) {
  Users.remove({_id: id});
}

Meteor.methods({
  'users.addUser'(newUser) {
    checkAdmin(this.userId);
    return addUser(newUser, newUser.userType);
  },
  'users.removeUser'(userId) {
    checkAdmin(this.userId);
    checkString(userId);
    return removeUser(userId);
  }
});

// only for TESTING purposes
export {
  addUser
};
