import {Component, OnInit} from '@angular/core';

import {List} from './list';
import {Task} from './task';
import {ListService} from './list.service';
import {TaskService} from './task.service';

@Component({
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
    providers: [ListService, TaskService]
})
export class AppComponent implements OnInit {
    lists: List[];

    constructor(
        private listService: ListService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getLists();
    }

    getLists() {
        this.listService.getLists()
            .subscribe(lists => this.lists = lists);
    }

    addTask(task: any, listId: number) {
        if (!name) {
            return;
        }
        if (!listId) {
            return;
        }
        this.taskService.addTask(name, listId);
    }

    deleteTask(task: Task) {
        

        this.taskService.delete(task)
            .then(res => {
                debugger
                this.lists.filter(l => l.Id == task.ListId)[0].Tasks.filter(t => t !== task);
            });
    }



}
