import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';
import {MeteorObservable} from 'meteor-rxjs';
import {Users} from '../../../api/imports/collections/users';
import {User} from '../../../api/imports/models/user.model';
import {NewUser} from '../../../api/imports/models/new-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users$: Observable<User[]> = Users.find({});

  constructor() {
      MeteorObservable.subscribe('users').subscribe();
  }

  createUser(newUser: NewUser): Observable<any> {
    return MeteorObservable.call('users.addUser',
      newUser).pipe(share());
  }

  createAdminUser(newUser: NewUser): Observable<any> {
    return MeteorObservable.call('users.addAdmin',
      newUser).pipe(share());
  }

  removeUser(userId: string) {
    return MeteorObservable.call('users.removeUser',
      userId).pipe(share());
  }
}
