import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EmployeeFilter } from '../../../models/employeeFilter';
import { SelectedFiltersService } from '../../../states/selected-filters.service';
import { FilterService } from '../../../services/filters/filter.service';
import { DisplayDataService } from '../../../states/display-data.service';
import Employee from '../../../models/employee';

@Component({
  selector: 'app-alphabets-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alphabets-filter.component.html',
  styleUrl: './alphabets-filter.component.css'
})
export class AlphabetsFilterComponent {
  alphabets: string[] = [];
  selectedEmployeeFilter:EmployeeFilter=new EmployeeFilter([],[],[],[]);
  displayData: Employee[] = [];

  
  constructor(private displayDataService:DisplayDataService, private selectedFilterService:SelectedFiltersService, private filterService:FilterService){
    
  }
  ngOnInit() {
    this.generateAlphabets();
    this.selectedFilterService.selectedEmployeeFilterList.subscribe( data=> this.selectedEmployeeFilter=data);
    this.displayDataService.employeeDisplayDataObserver.subscribe(data => this.displayData=data);
  }

  generateAlphabets() {
    for (let i = 1; i <= 26; i++) {
      this.alphabets.push(String.fromCharCode(64 + i));
    }
  }

  manageEmployeeFilter(event:Event) {
    let element = event.target as HTMLDivElement;
    let criteria: string = element.classList[1];
    this.selectedEmployeeFilter = this.filterService.manageSelectedFilterOptions(
      element,
      this.selectedEmployeeFilter,
      criteria
    ) as EmployeeFilter;
    element.classList.toggle("active");
  
    if (criteria == "selectedAlphabets") {
      let removeFilterBtn = document.querySelector(
        ".remove-filter-btn"
      ) as HTMLImageElement;
      removeFilterBtn.src = "assets/interface/filter_red.svg";
      this.displayData = this.filterService.applyFilter(
        this.selectedEmployeeFilter,
        this.displayData
      );

      this.displayDataService.set(this.displayData);
    } else {
      this.filterService.toggleFilterApplyButtons(this.selectedEmployeeFilter);
    }
  }

  manageResetAlphabetFilter() {
    this.displayData = this.filterService.resetAlphabetFilter(
      this.selectedEmployeeFilter,
      this.displayData
    );

    this.displayDataService.set(this.displayData);
  }
}
