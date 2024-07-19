import { Injectable } from '@angular/core';
import { EmployeeFilter } from '../models/employeeFilter';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoleFilter } from '../models/roleFilter';

@Injectable({
  providedIn: 'root'
})
export class SelectedFiltersService {

  selectedEmployeeFilter = new EmployeeFilter([],[],[],[]);
  selectedEmployeeFilterSubject = new BehaviorSubject<EmployeeFilter>(this.selectedEmployeeFilter);

  selectedRoleFilter = new RoleFilter([],[]);
  selectedRoleFilterSubject = new BehaviorSubject<RoleFilter>(this.selectedRoleFilter);
  
  constructor() {
    
  }

  get selectedEmployeeFilterList(): Observable<EmployeeFilter> {
    return this.selectedEmployeeFilterSubject.asObservable();
  }


  setEmployeeFilter(newSelectedEmployeeFilter: EmployeeFilter) {
    this.selectedEmployeeFilterSubject.next(newSelectedEmployeeFilter);
  }

  
}