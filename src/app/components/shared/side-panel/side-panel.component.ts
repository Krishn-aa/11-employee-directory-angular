import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  isCollapsed = false;
  constructor(private route: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth <= 1200 && !this.isCollapsed) {
      this.isCollapsed = true;
    } else if (window.innerWidth > 1200 && this.isCollapsed) {
      this.isCollapsed = false;
    }
  }

  toggleSidePanel() {
    if (window.innerWidth > 1200) {
      this.isCollapsed = !this.isCollapsed;
    } else {
      this.isCollapsed = true;
    }
  }

  isActiveLink(url: string) {
    return this.route.url.includes(url);
  }

  getSvgLink(url: string) {
    if (this.isActiveLink(url)) {
      return "red";
    } else {
      return "black";
    }
  }
}
