import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { EmployeeModel } from "./models/employee.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    loadData(): Observable<EmployeeModel[]> {
        return this.httpClient.get<EmployeeModel[]>(environment.apiUrl);
    }
}