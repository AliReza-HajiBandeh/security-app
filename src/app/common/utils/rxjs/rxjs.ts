import { from, Observable, of } from 'rxjs';

export function asObservable<T>(value: T | Observable<T> | Promise<T>): Observable<T> {
    if (value instanceof Observable) {
        return value;
    } else if (value instanceof Promise) {
        return from(value);
    } else {
        return of(value);
    }
}
