import { Employee } from './employee';
import { EmployeeService } from './services/employee.service';
import { Component, OnInit } from '@angular/core';
import { catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerApp';
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.getAllEmployee();
  }

  public getAllEmployee(): void {
    this.employeeService.getAllEmployee().pipe(
      map((response: Employee[]) => {
        this.employees = response;
        return this.employees;
      }),
      catchError((error: string) => {
       console.error(error);
       return of({error});
      }),
    )
  }
}
