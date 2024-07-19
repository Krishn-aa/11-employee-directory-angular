import { Injectable } from '@angular/core';
import Employee from '../models/employee';
import { EmployeeDataService } from '../services/employee-data/employee-data-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleDataService } from '../services/role-data/role-data.service';
import Role from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class DisplayDataService {
  private employeeDataSubject = new BehaviorSubject<Employee[]>([]);
  private roleDataSubject = new BehaviorSubject<Role[]>([]);
  constructor(private employeeService: EmployeeDataService, private roleService:RoleDataService) {
    this.employeeService.employees$.subscribe(data => {
      this.employeeDataSubject.next(data);
    });

    this.roleService.roles$.subscribe(data => {
      this.roleDataSubject.next(data);
    });
  }

  get employeeDisplayDataObserver(): Observable<Employee[]> {
    return this.employeeDataSubject.asObservable();
  }

  get roleDisplayDataObserver(): Observable<Role[]> {
    return this.roleDataSubject.asObservable();
  }

  set(newDisplayData: Employee[]) {
    this.employeeDataSubject.next(newDisplayData);
  }

  setRoles(newDisplayData: Role[]) {
    this.roleDataSubject.next(newDisplayData);
  }
}