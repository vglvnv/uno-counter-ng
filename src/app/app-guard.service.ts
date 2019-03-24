import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import { filter, take } from 'rxjs/operators';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate() {
    return this.store.pipe(
      select(fromRoot.getIsInitialized),
      filter(val => val === true),
      take(1)
    );
  }
  constructor(private store: Store<fromRoot.State>) {}
}
