"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
const task_1 = require('./task');
let TaskService = class TaskService {
    constructor(http) {
        this.http = http;
    }
    //getTasks() {
    //    return this.http.get('api/list')
    //        .map((res: Response) => res.json());
    //}
    addTask(name, listId) {
        var task = new task_1.Task();
        task.Name = name;
        task.ListId = listId;
        let body = JSON.stringify(task);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let url = 'api/task/name/' + task.Name + '/listId/' + task.ListId + '';
        return this.http.post(url, body, options)
            .map(this.extractData)
            .toPromise()
            .catch(this.handleError);
    }
    delete(task) {
        let headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        let url = `api/task/${task.Id}`;
        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }
    complete(task) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let url = `api/task/complete/${task.Id}`;
        return this.http
            .put(url, '', options)
            .toPromise()
            .catch(this.handleError);
    }
    uncomplete(task) {
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        let url = `api/task/uncomplete/${task.Id}`;
        return this.http
            .put(url, '', options)
            .toPromise()
            .catch(this.handleError);
    }
    handleError(error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    extractData(res) {
        let body = res.json();
        return body.data || {};
    }
};
TaskService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
