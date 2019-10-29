import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {debounce, share} from 'rxjs/operators';
import {MeteorObservable} from 'meteor-rxjs';
import {Organisation} from '../../../api/imports/models/organisation.model';
import {Organisations} from '../../../api/imports/collections/organisations';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {

  organisations$: Observable<Organisation[]> = Organisations.find({}).pipe(debounce(() => timer(50)));

  constructor() {
    MeteorObservable.subscribe('organisations').subscribe();
    this.organisations$.subscribe();
  }

  addOrganisation(organisation: Organisation): Observable<any> {
    return MeteorObservable.call('organisations.add',
      organisation).pipe(share());
  }

  updateOrganisation(organisation: Organisation): Observable<any> {
    return MeteorObservable.call('organisations.update',
      organisation).pipe(share());
  }

  removeOrganisation(id: string) {
    return MeteorObservable.call('organisations.remove',
      id).pipe(share());
  }
}
