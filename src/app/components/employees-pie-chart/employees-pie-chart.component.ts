import { Component, Input, OnInit } from '@angular/core';
import { EmployeeTableRowModel } from 'src/app/models/employee-table-row.model';

@Component({
    selector: 'app-employees-pie-chart',
    templateUrl: './employees-pie-chart.component.html',
    styleUrls: [
        './employees-pie-chart.component.scss'
    ]
})
export class EmployeesPieChartComponent implements OnInit {
    @Input() employees: EmployeeTableRowModel[] = [];

    options: any;

    ngOnInit(): void {
        this.options = {
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    type: 'pie',
                    radius: '60%',
                    data: this.employees.map((employee) => ({
                        value: employee.SumHours,
                        name: employee.EmployeeName
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
}