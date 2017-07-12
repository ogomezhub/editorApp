import {Injectable} from '@angular/core';
import {List} from '../jsondata/jsondata';
import {Observable} from 'rxjs/Observable';

let favorites = [];
@Injectable()

export class ListService{

	 findAll() {
        return Observable.create(observer => {
            observer.next(List);
            observer.complete();
        });
    }

    getNgos() {
        return Observable.create(observer => {
            observer.next(favorites);
            observer.complete();
        });
    }

}