export default class Employee {
  public id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public mobNumber: string;
  public dob: Date;
  public role: string;
  public department: string;
  public location: string;
  public joinDate: Date;
  public managerName: string;
  public projectName: string;
  public status: string;
  public roleId: string;
  public profilePicture: string;

  constructor(
    id: string,
    profilePicture: string,
    firstName: string,
    lastName: string,
    email: string,
    mobNumber: string,
    dob: Date,
    role: string,
    department: string,
    location: string,
    joinDate: Date,
    managerName: string,
    projectName: string,
    status: string = 'Active',
    roleId: string
  ) {
    this.id = id;
    this.profilePicture = profilePicture;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.mobNumber = mobNumber;
    this.dob = dob;
    this.role = role;
    this.department = department;
    this.location = location;
    this.joinDate = joinDate;
    this.managerName = managerName;
    this.projectName = projectName;
    this.status = status;
    this.roleId = roleId;
  }
}
