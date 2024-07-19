import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Employee from '../../models/employee';
import { ApiService } from '../api/api.service';
import Project from '../../models/project';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDataService {
  
  employees$: Observable<Employee[]>;
  projects$: Observable<Project[]>;
  constructor(private http: HttpClient, private apiService:ApiService) {
    this.employees$ = this.apiService.getAll('Employee/Employees').pipe(catchError(this.handleError));
    this.projects$ = this.apiService.getAll('Employee/Projects').pipe(catchError(this.handleError));
  }

  employee(id: string): Observable<Employee> {
    return this.apiService.get('Employee/Employees',id);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }
}
