import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

export class ComponentBase implements OnDestroy {

  protected subscriptions: Subscription[] = [];

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
