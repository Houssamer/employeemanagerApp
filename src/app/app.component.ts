import { EmployeeService } from './services/employee.service';
import { Component } from '@angular/core';
import { catchError, map, startWith } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeemanagerApp';

  constructor(private employeeService: EmployeeService) {}


  public getAllEmployee(): void {
    this.employeeService.getAllEmployee().pipe(
      map((response) => {

      }),
      startWith(),
      catchError((error) => ),
    )
  }
}
