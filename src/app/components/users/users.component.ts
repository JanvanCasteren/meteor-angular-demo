import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {combineLatest, timer} from 'rxjs';
import {OrganisationsService} from '../../services/organisations.service';
import {User} from '../../../../api/imports/models/user.model';
import {ComponentBase} from '../../component-base';
import {debounce} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';

export interface DisplayUser extends User {
  organisationName: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends ComponentBase implements OnInit {

  users: DisplayUser[] = [];

  constructor(
    private authService: AuthService,
    private organisationsService: OrganisationsService,
    private usersService: UsersService
  ) {
    super();
    this.subscriptions.push(
      combineLatest(
        organisationsService.organisations$,
        usersService.users$
      ).pipe(debounce(() => timer(50))).subscribe(([organisations, users]) => {
        const organisationNames = new Map<string, string>();
        organisations.forEach((o) => {
          organisationNames.set(o._id, o.name);
        });
        this.users = users.map((user: DisplayUser) => {
          user.organisationName = organisationNames.get(user.organisationId);
          return user;
        });
      })
    );
  }

  ngOnInit() {
  }

  remove(id) {
    this.usersService.removeUser(id)
      .subscribe(() => {
      }, (error) => {
        alert(`${error.error}: ${error.details}`);
      });
  }

}
