import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';



@Injectable()
export class ListService {
    constructor(private http: Http) { }


    getLists() {
        return this.http.get('api/list')
            .map((res: Response) => res.json());

    }

   
}