import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidePanelComponent } from './components/shared/side-panel/side-panel.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidePanelComponent, MainPanelComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'EmployeeDirectory-Angular';
}
