import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as localForage from 'localforage';

import { State } from './store/reducers';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setState(state: State): Observable<State> {
    return from(localForage.setItem('gameState', state));
  }
  getState(): Observable<State> {
    return from(localForage.getItem<State>('gameState'));
  }
  clearState(): Observable<void> {
    return from(localForage.removeItem('gameState'));
  }
}
