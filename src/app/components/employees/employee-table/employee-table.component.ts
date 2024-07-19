import { Component, OnInit } from '@angular/core';
import Employee from '../../../models/employee';
import { CommonModule } from '@angular/common';
import { SortingService } from '../../../services/sorting/sorting.service';
import { DisplayDataService } from '../../../states/display-data.service';


@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  employees: Employee[] = [];
  tableData: Employee[] = [];
  sortColumnName = "none";
  sortDirection = "none";

  isEllipsisOpen = false;

  constructor(private dataService: DisplayDataService, private sortService: SortingService) {}

  ngOnInit() {
    this.dataService.employeeDisplayDataObserver.subscribe(data => this.tableData=data);
    this.dataService.employeeDisplayDataObserver.subscribe(data => this.employees=data);
    
  }

  unpopulateEmployee() {
    this.tableData = this.employees;
  }

  manageTableSorting(columnName: string) {
    this.tableData = this.employees.slice();
    [this.sortDirection, this.sortColumnName, this.tableData] =
      this.sortService.handleColumnSort(
        columnName,
        this.sortColumnName,
        this.employees,
        this.sortDirection,
      );
  }

  deleteAllEmployees() {
    
  }

  manageEmployeeDeletion(event: Event, empId: string | undefined) {
    
  }

  showEllipsisMenu(event: Event) {
    this.isEllipsisOpen=!this.isEllipsisOpen;
  }

  viewDetails(empId: string) {
    
  }

  editDetails(empId: string) {
    
  }

  deleteFromEllipsisMenu(empId: string) {
   
  }
}


