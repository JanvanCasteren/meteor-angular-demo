// describes the options object that should be passed
// into Accounts.createUser, see https://docs.meteor.com/api/passwords.html#Accounts-createUser

import {UserTypes} from '../types/user-types';

export interface NewUser {
  userType: UserTypes;
  organisationId?: string;
  name: string;
  email: string;
  password: string;
}
