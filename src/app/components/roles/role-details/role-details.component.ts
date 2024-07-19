import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoleDataService } from '../../../services/role-data/role-data.service';
import Role from '../../../models/role';
import { EmployeeDataService } from '../../../services/employee-data/employee-data-service';
import Employee from '../../../models/employee';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  roleId: string = "";
  role: Role | undefined;
  employees: Employee[] = [];

  constructor(
    private dataService: RoleDataService,
    private route: ActivatedRoute,
    private employeeService: EmployeeDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.roleId = id;
        this.fetchRole();
        this.fetchEmployees();
      }
    });
  }

  fetchRole(): void {
    this.dataService.roles$.subscribe(data => {
      this.role = data.find(role => role.id === this.roleId) || undefined;
    });
  }

  fetchEmployees(): void {
    this.employeeService.employees$.subscribe(data => {
      this.employees = data.filter(employee => employee.roleId === this.roleId);
    });
  }

  handleAddEmployee(): void {
    
  }
}
