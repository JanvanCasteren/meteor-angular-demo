import {Meteor} from 'meteor/meteor';

export interface User extends Meteor.User {
  userType?: string;
  organisationId?: string;  // added properties must be defined optional (even if they are not)
  name?: string;
  // otherwise compile will complain about incompatibility of Meteor.user and our User
}
