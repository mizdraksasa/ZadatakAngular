import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { EmployeeTableRowModel } from './models/employee-table-row.model';
import { EmployeeModel } from './models/employee.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  employees: EmployeeTableRowModel[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.loadData()
      .subscribe((data: EmployeeModel[]) => {

        // Calculate work time in hours for each employee
        data.forEach((element: EmployeeModel) => {
          element.WorkTimeInHours = this.calculateTimeWorkedInHours(element);
        });

        // Get only employee names, and filter only elements with values
        const employeeNames = data
          .map((element: EmployeeModel) => element.EmployeeName)
          .filter((element: string) => !!element);

        // Create array with only unique names
        const employeeNamesDistinct = [...new Set(employeeNames)];

        // Create final result
        const result: EmployeeTableRowModel[] = [];

        // Go through each employee name and calculate total working hours
        employeeNamesDistinct.forEach((name: string) => {

          // Get employee by name
          const dataPerEmployee = data.filter((p: EmployeeModel) => p.EmployeeName === name);

          // Calculate sum hours for each employee
          let sumHours = 0;
          dataPerEmployee.forEach((p: EmployeeModel) => {
            sumHours += p.WorkTimeInHours;
          });

          // Create new Employee table row element and add to result list
          result.push({
            EmployeeName: name,
            SumHours: Math.round(sumHours * 100) / 100
          })
        })

        // Sort list by Sum Hours descending
        const sortedResult = result.sort((a: EmployeeTableRowModel, b: EmployeeTableRowModel) => b.SumHours - a.SumHours);

        this.employees = sortedResult;
      });
  }

  // Function to calculate working time
  calculateTimeWorkedInHours(item: EmployeeModel): number {
    // Create date objects from strings
    const startDateTime = new Date(item.StarTimeUtc);
    const endDateTime = new Date(item.EndTimeUtc);

    // Calculate difference between dates in miliseconds
    const differenceInMiliseconds = endDateTime.getTime() - startDateTime.getTime();
    // Convert miliseconds to hours
    const differenceInHours = differenceInMiliseconds / 3600000;

    // Round to two decimals and return result
    return Math.round(differenceInHours * 100) / 100;
  }

  editLinkClick(data: any) {
    alert(`Clicked on Employee "${data.name}" edit button`);
  }
}
