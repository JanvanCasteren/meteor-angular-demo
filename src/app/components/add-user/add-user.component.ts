import {Component, OnInit} from '@angular/core';
import {NewUser} from "../../../../api/imports/models/new-user.model";
import {UserTypes} from "../../../../api/imports/types/user-types";
import {OrganisationsService} from "../../services/organisations.service";
import {UsersService} from "../../services/users.service";

function secureMathRandom() {
  // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
}

function generatePassword() {
  const length = 12;
  const charset = 'abcdefghjkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(secureMathRandom() * n));
  }
  return retVal;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  model: NewUser = {
    userType: UserTypes.Editor,
    organisationId: '',
    email: '',
    name: '',
    password: ''
  };
  userTypes = Object.keys(UserTypes)
    .map((k) => UserTypes[k]);
  message = '';
  error = '';
  busy = false;

  constructor(
    private organisationsService: OrganisationsService,
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
  }

  add() {
    this.busy = true;
    this.model.password = generatePassword();
    this.usersService.createUser(this.model)
      .subscribe(() => {
        // user succesfully generated, show password
        this.message = `Account for ${this.model.email} has been added with password ${this.model.password}`;
        // reset model
        this.model.email = '';
        this.model.name = '';
        this.model.password = '';
        this.error = '';
        this.busy = false;
      }, (error) => {
        this.error = `${error.error}: ${error.details}`;
        this.busy = false;
      });
  }

}
