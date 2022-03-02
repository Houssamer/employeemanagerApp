import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  public getAllEmployee(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/all`);
  }

  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/find/${id}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  public updateEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/delete/${id}`);
  }
}
