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
        var task = new Task();
        task.Name = name;
        task.ListId = listId;

        let body = JSON.stringify(task);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let url = 'api/task/name/' + task.Name + '/listId/' + task.ListId + '';
        return this.http.post(url, body, options)
            .map(this.extractData)
            .toPromise()            
            .catch(this.handleError);
    }

    delete(task: Task) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `api/task/${task.Id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    complete(task: Task) {
       
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = `api/task/complete/${task.Id}`;

        return this.http
            .put(url, '', options)
            .toPromise()
            .catch(this.handleError);
    }

    uncomplete(task: Task) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let url = `api/task/uncomplete/${task.Id}`;

        return this.http
            .put(url, '', options)
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