import { Component } from '@angular/core';
import { EmployeeHeaderComponent } from '../employee-header/employee-header.component';
import { AlphabetsFilterComponent } from '../alphabets-filter/alphabets-filter.component';
import { OptionFilterComponent } from '../../shared/option-filter/option-filter.component';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-employee-main',
  standalone: true,
  imports: [EmployeeHeaderComponent,AlphabetsFilterComponent,OptionFilterComponent,EmployeeTableComponent],
  templateUrl: './employee-main.component.html',
  styleUrl: './employee-main.component.css'
})
export class EmployeeMainComponent {
  
}
