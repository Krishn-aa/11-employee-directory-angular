import { Component, OnInit } from '@angular/core';
import { EmployeeFilter } from '../../../models/employeeFilter';
import { FilterService } from '../../../services/filters/filter.service';
import Employee from '../../../models/employee';
import { DisplayDataService } from '../../../states/display-data.service';
import { SelectedFiltersService } from '../../../states/selected-filters.service';
import Role from '../../../models/role';
import { RoleDataService } from '../../../services/role-data/role-data.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoleFilter } from '../../../models/roleFilter';
import Location from '../../../models/location';
import Department from '../../../models/department';

@Component({
  selector: 'app-option-filter',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './option-filter.component.html',
  styleUrls: ['./option-filter.component.css'], // Ensure this is plural: styleUrls
})
export class OptionFilterComponent implements OnInit {
  selectedEmployeeFilter: EmployeeFilter = new EmployeeFilter([], [], [], []);
  selectedRoleFilter: RoleFilter = new RoleFilter([], []);

  employeesToDisplay: Employee[] = [];
  rolesToDisplay: Role[] = [];

  rolesData: Role[] = [];
  locations: Location[] = [];
  departments: Department[] = [];

  constructor(
    private displayDataService: DisplayDataService,
    private selectedFilterService: SelectedFiltersService,
    private filterService: FilterService,
    private roleDataService: RoleDataService,
    private route: Router
  ) {}

  ngOnInit() {
    this.selectedFilterService.selectedEmployeeFilterList.subscribe(
      (data) => (this.selectedEmployeeFilter = data)
    );
    this.displayDataService.employeeDisplayDataObserver.subscribe(
      (data) => (this.employeesToDisplay = data)
    );
    this.displayDataService.roleDisplayDataObserver.subscribe(
      (data) => (this.rolesToDisplay = data)
    );
    this.roleDataService.roles$.subscribe((data) => {
      this.rolesData = data;
      this.roleDataService.location$.subscribe(data=> this.locations=data);
      this.roleDataService.departments$.subscribe(data=> this.departments=data);

    });
  }

  
  toggleFilterApplyButtons(selectedFilter: any) {
    let isOptionFilterApplied = false;
    Object.keys(selectedFilter).forEach((type) => {
      if (
        type != 'selectedAlphabets' &&
        selectedFilter[type as keyof EmployeeFilter].length > 0
      ) {
        isOptionFilterApplied = true;
      }
    });
    const btnReset = document.querySelector(
      '.filter-options-reset'
    ) as HTMLButtonElement;
    const btnApply = document.querySelector(
      '.filter-options-apply'
    ) as HTMLButtonElement;
    let show = 'inline-block';
    let hide = 'none';
    if (isOptionFilterApplied) {
      btnReset.style.display = show;
      btnApply.style.display = show;
    }
  }

  // Show filter Dropdowns
  showFilterDropdown(currFilterOption: HTMLDivElement) {
    currFilterOption.nextElementSibling!.classList.toggle('active');
    const dropDownBtnIcon = currFilterOption.children[0].children[1];
    dropDownBtnIcon.classList.toggle('active');
    if (this.isRolesPage()) {
      this.toggleFilterApplyButtons(this.selectedRoleFilter);
    } else {
      this.toggleFilterApplyButtons(this.selectedEmployeeFilter);
    }
  }

  manageApplyFilterBtn() {
    if(this.isRolesPage()){
      this.rolesToDisplay = this.filterService.applyFilter(this.selectedRoleFilter,this.rolesToDisplay);
      this.displayDataService.setRoles(this.rolesToDisplay);
    }else{
      this.employeesToDisplay = this.filterService.applyFilter(
        this.selectedEmployeeFilter,
        this.employeesToDisplay
      );
      this.displayDataService.set(this.employeesToDisplay);
    }

  }

  manageResetFilterBtn() {
    if(!this.isRolesPage()){
      this.employeesToDisplay = this.filterService.resetFilter(
        this.selectedEmployeeFilter,
        this.employeesToDisplay
      );
      this.displayDataService.set(this.employeesToDisplay);
    }
    else{
      this.rolesToDisplay = this.filterService.resetFilter(this.selectedRoleFilter, this.rolesToDisplay);
      this.displayDataService.setRoles(this.rolesToDisplay);
    }
  }

  //Employee
  manageEmployeeFilter(event: Event) {
    let element = event.target as HTMLDivElement;
    let criteria: string = element.classList[1];
    this.selectedEmployeeFilter =
      this.filterService.manageSelectedFilterOptions(
        element,
        this.selectedEmployeeFilter,
        criteria
      ) as EmployeeFilter;
    element.classList.toggle('active');

    if (criteria == 'selectedAlphabets') {
      let removeFilterBtn = document.querySelector(
        '.remove-filter-btn'
      ) as HTMLImageElement;
      removeFilterBtn.src = '../../assets/interface/filter_red.svg';
      this.employeesToDisplay = this.filterService.applyFilter(
        this.selectedEmployeeFilter,
        this.employeesToDisplay
      );

      this.displayDataService.set(this.employeesToDisplay);
    } else {
      this.filterService.toggleFilterApplyButtons(this.selectedEmployeeFilter);
    }
  }

  //Roles Filter
  isRolesPage() {
    return this.route.url.includes('roles');
  }

  manageRoleFilter(e:Event) {
    let element = e.target as HTMLDivElement;
    let criteria: string = element.classList[1];

    this.selectedRoleFilter = this.filterService.manageSelectedFilterOptions(
      element,
      this.selectedRoleFilter,
      criteria
    );
    element.classList.toggle('active');

    this.toggleFilterApplyButtons(this.selectedRoleFilter);
  }
}
