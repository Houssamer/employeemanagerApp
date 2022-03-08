import { Employee } from './employee';
import { EmployeeService } from './services/employee.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, of, startWith } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employeemanagerApp';
  public employees: Employee[] = [];
  public editEmployee: Employee | null = null;
  public deletedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployee();
  }

  public getAllEmployee(): void {
    this.employeeService.getAllEmployee().subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public openModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    switch (mode) {
      case 'add':
        button.setAttribute('data-target', '#addEmployeeModal');
        break;
      case 'edit':
        button.setAttribute('data-target', '#updateEmployeeModal');
        this.editEmployee = employee;
        break;
      case 'delete':
        button.setAttribute('data-target', '#deleteEmployeeModal');
        this.deletedEmployee = employee;
        break;
      default:
        break;
    }

    container?.appendChild(button);
    button.click();
  }

  public searchEmployee(key: string): void {
    const result = this.employees.filter((employee) => employee.name === key);
    this.employees = result;
    if (result.length == 0 || !key) {
      this.getAllEmployee();
    }
  }

  public addEmployee(form: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(form.value as Employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public updateEmployee(employee: Employee | null): void {
    document.getElementById('edit-close')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public deleteEmployee(employee: Employee | null): void {
    document.getElementById('deleteClose')?.click();
    this.employeeService.deleteEmployee(employee?.id).subscribe(
      (response) => {
        console.log(response);
        alert('deleted');
        this.getAllEmployee();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }
}
