import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeTableRowModel } from 'src/app/models/employee-table-row.model';

@Component({
    selector: 'app-employees-table',
    templateUrl: './employees-table.component.html',
    styleUrls: [
        './employees-table.component.scss'
    ]
})
export class EmployeesTableComponent {
    @Input() employees: EmployeeTableRowModel[] = [];

    @Output() editLinkClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    edit(employee: any) {
        this.editLinkClick.emit(employee);
    }
}