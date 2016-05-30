import {Component, OnInit} from '@angular/core';

import {List} from './list';
import {Task} from './task';
import {ListService} from './list.service';
import {TaskService} from './task.service';

@Component({
    selector: 'my-app',
    template: `<h3>My First Angular 2 App 1</h3>
                <ul class="lists">
                    <li *ngFor="let list of lists; let listIndex = index" class="list">
                    {{list.Name}} <button type="button" (click)="addTaskModal(list.Id, listIndex)">Add task</button>

                        <ul *ngIf="list.Tasks.length > 0">
                            <li *ngFor="let task of list.Tasks; let taskIndex = index">
                            {{task.Name}}
                            <button type="button" (click)="showDeleteTaskModal(task, listIndex, taskIndex)">Delete {{task.Name}}</button>
                            </li>
                        </ul>                 
                    </li>
                <ul>
<div *ngIf="showDeleteTask">
<h2>Task:{{selectedTask.Name}}</h2>
<h3>Are you sure you want to delete the task?</h3>
<button type="button" (click)="deleteTask(selectedTask)">Yes</button>
<button type="button" (click)="hideDeleteTaskModal()">No</button>
</div>

<div *ngIf="showAddTaskModal">
<form (ngSubmit)="addTask(newTask)" #newTaskForm="ngForm">
<input [(ngModel)]="newTask.Name" required />
<button type="button" (click)="addTask(newTask)" [disabled]="!newTaskForm.form.valid">Add Task</button>
</form>
</div>

`,
    providers: [ListService, TaskService]
})
export class AppComponent implements OnInit {
    lists: List[];
    showDeleteTask = false;
    showAddTaskModal = false;
    selectedTask;
    selectedList = {
        id: 0,
        listIndex: 0
    };
    newTask = new Task();

    constructor(
        private listService: ListService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getLists();
        var showDeleteTask = false;
    }

    getLists() {
        this.listService.getLists()
            .subscribe(lists => this.lists = lists);
    }

    showDeleteTaskModal(task: Task, listIndex: number, taskIndex: number) {

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

    addTaskModal(listId: number, listIndex: number) {
        this.showAddTaskModal = true;
        this.showDeleteTask = false;
        this.selectedList.id = listId;
        this.selectedList.listIndex = listIndex;
    }


    addTask(newTask: Task) {
        if (newTask.Name.length === 0) {
            return;
        }
        this.taskService.addTask(newTask.Name, this.selectedList.id)
            .then(res => {
                this.lists[this.selectedList.listIndex].Tasks.push(newTask);
                this.showAddTaskModal = false;
                this.newTask = new Task();
                this.newTask.Name = '';
                this.newTask.Id = 0;
            });
    }
    deleteTask(task: Task) {
        this.taskService.delete(task)
            .then(res => {
                this.showDeleteTask = false;
                this.selectedTask = null;
                delete this.lists[task.listIndex].Tasks.splice(task.taskIndex, 1);
            });
    }



}
