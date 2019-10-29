import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../api/imports/models/user.model';
import {UserRoles} from '../../../api/imports/types/user-roles';
import {TodosService} from './todos.service';
import {UsersService} from './users.service';
import {OrganisationsService} from './organisations.service';

// Angular does not know about the Roles package, so we
// will define the only function that we use here
declare namespace Roles {
  function userIsInRole(user: any, roles: any): boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser$ = new BehaviorSubject<User>(null);

  public isAdmin$: Observable<boolean> = this.currentUser$
    .pipe(map(user => {
      return user && Roles.userIsInRole(user, UserRoles.Admin);
    }));

  public isEditor$: Observable<boolean> = this.currentUser$
    .pipe(map(user => {
      return user && Roles.userIsInRole(user, UserRoles.Editor);
    }));

  public isViewer$: Observable<boolean> = this.currentUser$
    .pipe(map(user => {
      return user && Roles.userIsInRole(user, UserRoles.Viewer);
    }));

  constructor(
    private todosService: TodosService,
    private userService: UsersService,
    private organisationService: OrganisationsService,
    private zone: NgZone
  ) {
    Tracker.autorun(() => {
      const user = Meteor.user();
      if (user) {
        // we do not set current user until his
        // roles are attached
        if (user.hasOwnProperty('roles')) {
          this.zone.run(() => {
            console.log('setting user');
            this.currentUser$.next(user);
          });
        }
      } else {
        if (this.currentUser$.getValue()) {
          this.zone.run(() => {
            this.currentUser$.next(null);
          });
        }
      }
    });
  }

  isLoggedIn(): boolean {
    // we use Meteor.userId() to check IF a user is currently logged in
    return typeof Meteor.userId() === 'string';
  }

  login(email: string, password: string): Promise<void> {
    console.log(email, password);
    return new Promise<void>((resolve, reject) => {
      Meteor.loginWithPassword(email, password, (e: Error) => {
        if (e) {
          return reject(e);
        }
        resolve();
      });
    });
  }

  logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Meteor.logout((e: Error) => {
        if (e) {
          return reject(e);
        }

        resolve();
      });
    });
  }
}
