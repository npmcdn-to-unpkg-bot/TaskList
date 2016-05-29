import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Task} from './task';



@Injectable()
export class TaskService {
    constructor(private http: Http) { }


    //getTasks() {
    //    return this.http.get('api/list')
    //        .map((res: Response) => res.json());

    //}

    addTask(name: string, listId: number) {
        var task = new Task({
            Id: null,
            Name: name,
            DateCreated: null,
            IsDeleted: false,
            ListId: listId

        });

        let body = JSON.stringify(task);
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });


        //this.http.post('api/task', body, options);
    }

    //deleteTask(id: number) {

    //    let headers = new Headers();
    //    headers.append('Content-Type', 'application/json');

    //    let url = 'api/task/' + id + '';

    //    return this.http
    //        .delete(url, headers);
    //}

    delete(task: Task) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `api/task/${task.Id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}