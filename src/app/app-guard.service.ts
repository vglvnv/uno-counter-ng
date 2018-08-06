import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from './store';
import { filter } from '../../node_modules/rxjs/operators';

@Injectable()
export class AppGuard implements CanActivate {
  canActivate() {
    return this.store.select(fromRoot.getInited).pipe(
      filter(val => val === true)
    );
  }
  constructor(
    private store: Store<fromRoot.State>
  ) { }
}
