import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../shared/search/search.component';
import { EmployeeMainComponent } from '../employees/employee-main/employee-main.component';
import { RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    EmployeeMainComponent,
    RouterOutlet,
    RouterModule
  ],
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.css'],
})
export class MainPanelComponent {
  isCollapsed = false;

  toggleSidePanelCollapse() {
    this.isCollapsed = !this.isCollapsed;

    const collapseBtn = document.querySelector('.side-panel-collapse-btn')!;
    const mainContainer = document.querySelector('.main-container')!;
    const logoImage = document.querySelector('.logo-img') as HTMLImageElement;
    const selectorTitles = document.querySelectorAll('.side-panel-title')!;
    const rightLogos = document.querySelectorAll('.side-panel-logo-right')!;
    const updateBox = document.querySelector('.side-panel-update-box')!;
    const sidePanelHeadings = document.querySelectorAll('.side-panel-heading')!;
    const headerContainer = document.querySelectorAll('.side-panel-header-container')!;
    const pseudoSideBar = document.querySelector('.pseudo-side-bar')!;

    mainContainer.classList.toggle('collapsed');
    updateBox.classList.toggle('hide');
    pseudoSideBar.classList.toggle('hide');

    if (this.isCollapsed) {
      logoImage.src = 'assets/tezo-logo-icon.svg';
    } else {
      logoImage.src = 'assets/tezo-logo.svg';
    }

    Array.from(selectorTitles).forEach((title, index) => {
      headerContainer[index].classList.toggle('collapsed');
      title.classList.toggle('hide');
    });

    Array.from(sidePanelHeadings).forEach(heading => {
      heading.classList.toggle('hide');
    });

    Array.from(rightLogos).forEach(logo => {
      logo.classList.toggle('hide');
    });

    collapseBtn.classList.toggle('collapsed');
  }
}