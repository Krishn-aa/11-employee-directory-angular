import { Injectable } from '@angular/core';
import Role from '../../models/role';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import Department from '../../models/department';
import Location from '../../models/location';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleDataService {
  roles$: Observable<Role[]>;
  location$: Observable<Location[]>;
  departments$: Observable<Department[]>;

  constructor(private apiService: ApiService) {
    this.roles$ = this.apiService
      .getAll('Role/Roles')
      .pipe(catchError(this.handleError));

    this.departments$ = this.apiService
      .getAll('Role/Departments')
      .pipe(catchError(this.handleError));

    this.location$ = this.apiService
      .getAll('Role/Locations  ')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something bad happened, please try again later.')
    );
  }
}
