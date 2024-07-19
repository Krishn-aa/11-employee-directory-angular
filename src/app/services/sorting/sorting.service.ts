import { Injectable } from '@angular/core';
import Employee from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class SortingService {

  constructor() { }
  //Table Sort
  handleColumnSort(
    columnName: string,
    sortColumnName: string,
    displayData: Employee[],
    sortDirection: string,
  ): [string, string, Employee[]] {
    let tableData: Employee[] = [];
    tableData = displayData.slice();
    if (sortDirection == "DESC") {
      sortDirection = "none";
      return [sortDirection, sortColumnName, tableData];
    } else if (sortColumnName == "none" || sortColumnName != columnName) {
      sortDirection = "ASC";
      sortColumnName = columnName;
    } else {
      sortColumnName = columnName;
      if (sortDirection == "ASC") sortDirection = "DESC";
      else if (sortDirection == "DESC") sortDirection = "none";
      else if (sortDirection == "none") sortDirection = "ASC";
    }
    tableData = this.sortColumn(
      sortDirection,
      columnName,
      tableData,
    );
    return [sortDirection, sortColumnName, tableData];
  }

  getEmployeeValueByColumnName(
    emp: Employee,
    columnName: string,
  ) {

    let value: string|Date = "";
    switch (columnName) {
      case "user":
        value = emp.firstName;
        break;
      case "location":
        value = emp.location;
        break;
      case "department":
        value = emp.department;
        break;
      case "role":
        value = emp.role;
        break;
      case "emp-no":
        value = emp.id;
        break;
      case "status":
        value = emp.status;
        break;
      case "join-date":
        value = emp.joinDate;
        break;

      default:
        break;
    }
    return value;
  }

  sortColumn(
    order: string,
    columnName: string,
    tableData: Employee[],
  ) {
    let returnValue = 1;
    if (order == "ASC" || order == "none") {
      returnValue = -returnValue;
    }

    tableData.sort((employee1, employee2) => {
      let employee1Value = this.getEmployeeValueByColumnName(
        employee1,
        columnName,
      );
      let employee2Value = this.getEmployeeValueByColumnName(
        employee2,
        columnName,
      );
      if (employee1Value < employee2Value) {
        return returnValue;
      }
      if (employee1Value > employee2Value) {
        return -returnValue;
      }
      return 0;
    });
    return tableData;
  }
}
