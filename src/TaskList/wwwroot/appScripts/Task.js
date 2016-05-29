"use strict";
class Task {
    constructor(task) {
        this.Id = task.Id;
        this.Name = task.Name;
        this.IsDeleted = task.IsDeleted;
        this.DateCreated = task.DateCreated;
        this.ListId = task.ListId;
    }
}
exports.Task = Task;
