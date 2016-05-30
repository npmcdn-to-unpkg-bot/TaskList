"use strict";
class Task {
    constructor() {
        this.Id = 0;
        this.Name = '';
        this.IsDeleted = false;
        this.DateCreated = '';
        this.ListId = 0;
        this.IsCompleted = false;
        this.taskIndex = 0;
        this.listIndex = 0;
    }
}
exports.Task = Task;
