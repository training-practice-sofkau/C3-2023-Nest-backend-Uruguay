import { Observable } from "rxjs";

export class ObservableHandel {

    handle<T>(value: T) {

        return new Observable<T>(observer => {
        //    observer.next(value);
          //  observer.complete();
        });
    }
}
