export class Task {
    Id: any;
    Name: any;
    IsDeleted: boolean;
    DateCreated: any;
    ListId: number;
    taskIndex: number;
    listIndex: number;

    constructor() {
        this.Id = 0;
        this.Name = '';
        this.IsDeleted = false;
        this.DateCreated = '';
        this.ListId = 0;
        this.taskIndex = 0;
        this.listIndex = 0;
    }
}