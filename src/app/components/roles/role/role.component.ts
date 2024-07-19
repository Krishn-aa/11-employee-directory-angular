
import { Component, OnInit } from '@angular/core';
import { DisplayDataService } from '../../../states/display-data.service';
import Role from '../../../models/role';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-role',
  standalone: true,
  imports:[CommonModule, RouterLink, RouterModule ],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roles: Role[] = [];
  roleCardsData: Role[] = [];

  constructor(private dataService: DisplayDataService, private router:Router) { }

  ngOnInit() {
    this.dataService.roleDisplayDataObserver.subscribe(data => {
      this.roleCardsData = data;
      this.roles = data;
      this.populateImages();
    });
  }

  populateImages() {
    this.roleCardsData.forEach(role => {
      const imgContainer = document.querySelector(`.${role.id}`);
      if (imgContainer) {
        // const imagesLinks: string[] = this.roleService.addImages(role.employees, imgContainer);
        // this.populateImagesInRolesCard(imagesLinks, imgContainer);
      }
    });
  }

  populateImagesInRolesCard(imagesLinks: string[], imgContainer: Element) {
    imagesLinks.forEach(link => {
      const img = document.createElement('img');
      img.src = link;
      img.alt = "Employee";
      imgContainer.appendChild(img);
    });
  }

  viewAllEmployees(roleId: string) {

  }

  unpopulateRole() {
    this.roleCardsData = this.roles;
  }
}
