import { Component } from '@angular/core';
import { RoleComponent } from '../role/role.component';
import { OptionFilterComponent } from '../../shared/option-filter/option-filter.component';
import { RoleHeaderComponent } from '../role-header/role-header.component';
import { RoleDetailsComponent } from '../role-details/role-details.component';

@Component({
  selector: 'app-role-main',
  standalone: true,
  imports: [RoleComponent,RoleHeaderComponent, OptionFilterComponent, RoleDetailsComponent],
  templateUrl: './role-main.component.html',
  styleUrl: './role-main.component.css'
})
export class RoleMainComponent {

}
