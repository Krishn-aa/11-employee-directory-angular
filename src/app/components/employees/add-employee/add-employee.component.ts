import { Component, OnInit } from '@angular/core';
import Employee from '../../../models/employee';
import Role from '../../../models/role';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDataService } from '../../../services/employee-data/employee-data-service';
import { RoleDataService } from '../../../services/role-data/role-data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Department from '../../../models/department';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee | null = null;
  roles: Role[] = [];
  jobTitles: string[] = [];
  departments: Department[] = [];
  locations: string[] = [];
  projects: string[] = [];

  newEmployeeId: string = '';

  selectedDepartment: string = '';
  selectedJobTitle: string = '';
  selectedLocation: string = '';

  employeeForm: FormGroup = new FormGroup({
    profilePicture: new FormControl(''),
    empId: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(new Date()),
    email: new FormControl(''),
    phoneno: new FormControl(''),
    joiningDate: new FormControl(new Date()),
    department: new FormControl(''),
    jobTitle: new FormControl(''),
    location: new FormControl(''),
    manager: new FormControl(''),
    project: new FormControl(''),
  });

  constructor(
    private router: Router,
    private employeeDataService: EmployeeDataService,
    private roleDataService: RoleDataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.employeeDataService.employees$.subscribe((data) => {
      this.employees = data;
      if (this.isViewEmployeePage()) {
        let id: string | null = this.activeRoute.snapshot.paramMap.get('id');
        if (id != null) {
          this.employeeDataService.employee(id).subscribe((data) => {
            this.employee = data;
            this.setEmployeeValues();
          });
        }
      } else {
        this.newEmployeeId = this.getNewId();
      }
    });

    this.roleDataService.roles$.subscribe((data) => {
      this.roles = data;
    });

    this.roleDataService.departments$.subscribe((data) => {
      this.departments = data;
    });
  }

  isViewEmployeePage() {
    return this.router.url.includes('TEZ');
  }

  onDepartmentChange(event: Event) {
    this.selectedDepartment = (event.target as HTMLInputElement).value;
    this.populateJobTitles();
  }

  onJobTitleChange(event: Event) {
    this.selectedJobTitle = (event.target as HTMLInputElement).value;
    this.populateLocations();
  }

  populateJobTitles() {
    if (this.selectedDepartment) {
      const filteredRoles = this.roles.filter(
        (role) => role.department === this.selectedDepartment
      );
      this.jobTitles = filteredRoles.map((role) => role.name);
    } else {
      this.jobTitles = [];
    }
  }

  populateLocations() {
    if (this.selectedDepartment && this.selectedJobTitle) {
      const filteredRoles = this.roles.filter(
        (role) =>
          role.department === this.selectedDepartment &&
          role.name == this.selectedJobTitle
      );
      this.locations = filteredRoles.map((role) => role.location);
    } else {
      this.locations = [];
    }
  }

  getNewId() {
    if (this.employees.length === 0) {
      return 'TEZ00001';
    }
    const lastIdNumber = this.employees
      .map((employee) => parseInt(employee.id.slice(3), 10))
      .reduce((max, current) => (current > max ? current : max), 0);

    const newIdNumber = lastIdNumber + 1;
    const newIdString = newIdNumber.toString().padStart(5, '0');
    return `TEZ${newIdString}`;
  }

  setEmployeeValues() {
    if (this.employee != null) {
      this.employeeForm.controls['empId'].setValue(this.employee.id);
      this.employeeForm.controls['firstName'].setValue(this.employee.firstName);
      this.employeeForm.controls['lastName'].setValue(this.employee.lastName);
      this.employeeForm.controls['dob'].setValue(this.employee.dob);
      this.employeeForm.controls['email'].setValue(this.employee.email);
      this.employeeForm.controls['phoneno'].setValue(this.employee.mobNumber);
      this.employeeForm.controls['joiningDate'].setValue(
        this.employee.joinDate
      );
      this.employeeForm.controls['department'].setValue(
        this.employee.department
      );
      this.employeeForm.controls['jobTitle'].setValue(this.employee.role);
      this.employeeForm.controls['location'].setValue(this.employee.location);
      this.employeeForm.controls['manager'].setValue(this.employee.managerName);
      this.employeeForm.controls['project'].setValue(this.employee.projectName);
    }
  }
}
