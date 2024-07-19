export default class Role {
  public id: string;
  public name: string;
  public department: string;
  public description: string;
  public employeeIds: string[];
  public location: string;


  constructor(
    roleId: string,
    roleName: string,
    department: string,
    description: string,
    employees: string[],
    location: string,
  ) {
    this.id = roleId;
    this.name = roleName;
    this.department = department;
    this.description = description;
    this.employeeIds = employees;
    this.location = location;
    this.employeeIds = employees;
  }
}