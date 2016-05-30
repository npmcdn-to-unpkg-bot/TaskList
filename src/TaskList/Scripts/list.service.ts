import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import {List} from './list';


@Injectable()
export class ListService {
    constructor(private http: Http) { }


    getLists() {
        return this.http.get('api/list')
            .map((res: Response) => res.json());

    }

    AddList(list: List) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('api/list/name/' + list.Name + '', '', options)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }



    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }


}