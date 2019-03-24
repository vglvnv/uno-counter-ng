import { MemoizedSelector, Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { State } from '../store/reducers';

export const makeSubscribeToSelectorFn = (store: Store<State>, unsubscribeSubject: Subject<any>) => <T>(
  selector: MemoizedSelector<object, T>
) => subscribeToSelector(store, unsubscribeSubject, selector);

export const subscribeToSelector = <T>(
  store: Store<State>,
  unsubscribeSubject: Subject<any>,
  selector: MemoizedSelector<object, T>
): Observable<T> =>
  store.pipe(
    select(selector),
    takeUntil(unsubscribeSubject)
  );
