import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }

  public getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/find/${id}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/add`, employee);
  }

  public updateEmployee(employee: Employee | null): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/update`, employee);
  }

  public deleteEmployee(id: number | undefined): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/delete/${id}`);
  }
}
