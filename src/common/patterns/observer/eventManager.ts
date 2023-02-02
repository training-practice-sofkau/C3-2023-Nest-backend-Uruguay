import { Observable } from "rxjs";

export class EventManager {
    manage<T>(value: T){
        return new Observable<T>(observer => {
            observer.next(value);
            observer.complete();
        })
    }
}
