import { Injectable } from '@angular/core';
import { FilterService } from '../filters/filter.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private filterService: FilterService) {}

  // applyFilter(selectedFilter: any, data: any, displayData: any) {
  //   let filterLabels = document.querySelectorAll<HTMLParagraphElement>(
  //     '.filter-options-btn p'
  //   );
  //   displayData = data.slice();
  //   type selectedFilterType = keyof typeof selectedFilter;

  //   Object.keys(selectedFilter).forEach((type) => {
  //     let filterOptions = selectedFilter[type as selectedFilterType];
  //     filterLabels.forEach((label) => {
  //       if (filterOptions.length > 0) {
  //         if (label.classList[0].toLowerCase() == type) {
  //           label.textContent = filterOptions.length + ' selected';
  //         }
  //         if (Object.keys(selectedFilter).length == 4) {
  //           displayData = this.filterService.removeUnfilteredEmployees(
  //             displayData,
  //             type,
  //             filterOptions
  //           );
  //         } else {
  //           displayData = this.filterService.removeUnfilteredRoles(
  //             displayData,
  //             type,
  //             filterOptions
  //           );
  //         }
  //       } else {
  //         if (label.classList[0].toLowerCase() == type) {
  //           label.textContent = this.filterService.capitalizeFirstLetter(type);
  //         }
  //       }
  //     });
  //   });
  //   return displayData;
  // }
}
