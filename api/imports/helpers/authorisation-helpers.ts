import {Users} from '../collections/users';
import {User} from '../models/user.model';
import {UserRoles} from '../types/user-roles';

declare namespace Roles {
  function userIsInRole(user: any, roles: any): boolean;
}

function getUser(userId) {
  return Users.collection.findOne({_id: userId});
}

export function getUserDescription(user: User) {
  if (user.profile && user.profile.name) {
    return user.profile.name;
  } else {
    return user.emails[0].address;
  }
}

export function checkUser(userId: string, organisationId: string = null): User {
  const user = getUser(userId);
  if (!user) {
    throw new Meteor.Error('access denied');
  }
  if (organisationId) {
    if (user.organisationId !== organisationId) {
      throw new Meteor.Error('access denied');
    }
  }
  return user;
}

export function checkAdmin(userId) {
  if (!Roles.userIsInRole(userId, UserRoles.Admin)) {
    throw new Meteor.Error('not authorised');
  }
}

export function checkEditor(userId) {
  if (!Roles.userIsInRole(userId, UserRoles.Editor)) {
    throw new Meteor.Error('not authorised');
  }
}
