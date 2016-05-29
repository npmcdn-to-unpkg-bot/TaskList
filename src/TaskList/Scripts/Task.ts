export class Task {
    Id: any;
    Name: any;
    IsDeleted: boolean;
    DateCreated: any;
    ListId: number;

    constructor(task: Task) {
        this.Id = task.Id;
        this.Name = task.Name;
        this.IsDeleted = task.IsDeleted;
        this.DateCreated = task.DateCreated;
        this.ListId = task.ListId;
    }
}