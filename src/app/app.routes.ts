import { Routes } from '@angular/router';
import { EmployeeMainComponent } from './components/employees/employee-main/employee-main.component';
import { RoleMainComponent } from './components/roles/role-main/role-main.component';
import { RoleDetailsComponent } from './components/roles/role-details/role-details.component';
import { AddEmployeeComponent } from './components/employees/add-employee/add-employee.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeMainComponent },
  { path: 'roles', component: RoleMainComponent },
  { path: 'roleDetails/:id', component: RoleDetailsComponent },
  { path: 'addEmployee', component: AddEmployeeComponent},
  { path: 'addEmployee/:id', component: AddEmployeeComponent},
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
];
