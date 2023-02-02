import { Observable } from "rxjs";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservableHandler {
    handle<T> (value: T) {
        return new Observable<T>(observer => {
            observer.next(value);
            observer.complete();
        })
    }
}