import {Component, OnInit} from '@angular/core';

import {List} from './list';
import {Task} from './task';
import {ListService} from './list.service';
import {TaskService} from './task.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.html',
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
    newList = new List();

    constructor(
        private listService: ListService,
        private taskService: TaskService
    ) { }

    ngOnInit() {
        this.getLists();
        var showDeleteTask = false;
    }


    // Tasks
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

    completeTask(task: Task) {
        this.taskService.complete(task)
            .then(res => {
                task.IsCompleted = true;
            });
    }
    uncompleteTask(task: Task) {
        this.taskService.uncomplete(task)
            .then(res => {
            task.IsCompleted = false;
        });;
    }
    


    // Lists
    getLists() {
        this.listService.getLists()
            .subscribe(lists => this.lists = lists);
    }

    addList(newList: List) {
        this.listService.AddList(newList)
            .then(res => {
                this.lists.push(newList);
                this.newList = new List();
                this.newList.Name = '';
            })
    }
}
