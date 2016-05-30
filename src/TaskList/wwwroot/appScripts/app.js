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
const list_1 = require('./list');
const task_1 = require('./task');
const list_service_1 = require('./list.service');
const task_service_1 = require('./task.service');
let AppComponent = class AppComponent {
    constructor(listService, taskService) {
        this.listService = listService;
        this.taskService = taskService;
        this.showDeleteTask = false;
        this.showAddTaskModal = false;
        this.selectedList = {
            id: 0,
            listIndex: 0
        };
        this.newTask = new task_1.Task();
        this.newList = new list_1.List();
    }
    ngOnInit() {
        this.getLists();
        var showDeleteTask = false;
    }
    getLists() {
        this.listService.getLists()
            .subscribe(lists => this.lists = lists);
    }
    showDeleteTaskModal(task, listIndex, taskIndex) {
        this.showDeleteTask = true;
        this.showAddTaskModal = false;
        this.selectedTask = task;
        this.selectedTask.taskIndex = taskIndex;
        this.selectedTask.listIndex = listIndex;
    }
    hideDeleteTaskModal() {
        this.showDeleteTask = false;
        this.selectedTask = null;
    }
    addTaskModal(listId, listIndex) {
        this.showAddTaskModal = true;
        this.showDeleteTask = false;
        this.selectedList.id = listId;
        this.selectedList.listIndex = listIndex;
    }
    addTask(newTask) {
        if (newTask.Name.length === 0) {
            return;
        }
        this.taskService.addTask(newTask.Name, this.selectedList.id)
            .then(res => {
            this.lists[this.selectedList.listIndex].Tasks.push(newTask);
            this.showAddTaskModal = false;
            this.newTask = new task_1.Task();
            this.newTask.Name = '';
            this.newTask.Id = 0;
        });
    }
    deleteTask(task) {
        this.taskService.delete(task)
            .then(res => {
            this.showDeleteTask = false;
            this.selectedTask = null;
            delete this.lists[task.listIndex].Tasks.splice(task.taskIndex, 1);
        });
    }
    addList(newList) {
        this.listService.AddList(newList)
            .then(res => {
            this.lists.push(newList);
            this.newList = new list_1.List();
            this.newList.Name = '';
        });
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.html',
        providers: [list_service_1.ListService, task_service_1.TaskService]
    }), 
    __metadata('design:paramtypes', [list_service_1.ListService, task_service_1.TaskService])
], AppComponent);
exports.AppComponent = AppComponent;
