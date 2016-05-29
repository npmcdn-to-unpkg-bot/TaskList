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
const list_service_1 = require('./list.service');
const task_service_1 = require('./task.service');
let AppComponent = class AppComponent {
    constructor(listService, taskService) {
        this.listService = listService;
        this.taskService = taskService;
    }
    ngOnInit() {
        this.getLists();
    }
    getLists() {
        this.listService.getLists()
            .subscribe(lists => this.lists = lists);
    }
    addTask(task, listId) {
        if (!name) {
            return;
        }
        if (!listId) {
            return;
        }
        this.taskService.addTask(name, listId);
    }
    deleteTask(task) {
        this.taskService.delete(task)
            .then(res => {
            debugger;
            this.lists.filter(l => l.Id == task.ListId)[0].Tasks.filter(t => t !== task);
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: `<h3>My First Angular 2 App 1</h3>
                <ul class="lists">
                    <li *ngFor="let list of lists" class="list">
                    {{list.Name}}

                        <ul *ngIf="list.Tasks.length > 0">
                            <li *ngFor="let task of list.Tasks">
                            {{task.Name}}
                            <button type="button" (click)="deleteTask(task)">Delete {{task.Name}}</button>
                            </li>
                        </ul>                 
                    </li>
                <ul>

`,
        providers: [list_service_1.ListService, task_service_1.TaskService]
    }), 
    __metadata('design:paramtypes', [list_service_1.ListService, task_service_1.TaskService])
], AppComponent);
exports.AppComponent = AppComponent;
