export class List {
    Id: number;
    Name: string;
    IsDeleted: boolean;
    DateCreated: any;
    Tasks: any;

    constructor() {
        this.Id = null;
        this.Name = '';
        this.IsDeleted = false;
        this.DateCreated = ''
        this.Tasks = [];
       
    }
}