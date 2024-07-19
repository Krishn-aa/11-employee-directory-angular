import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === '/') {
      this.focusSearchBar();
      event.preventDefault();
    }
  }

  focusSearchBar() {
    let searchbar = document.getElementById('searchbar') as HTMLInputElement;
    if (searchbar) {
      searchbar.focus();
    }
  }

  searchEmployee() {
    let input = (document.getElementById('searchbar') as HTMLInputElement).value.toLowerCase();
    let rows = document.getElementsByClassName('employee-table-row') as HTMLCollectionOf<HTMLElement>;

    for (let i = 1; i < rows.length; i++) {
      let name = rows[i].children[1].children[0].children[1].children[0].textContent!.toLowerCase();
      if (!name.includes(input)) {
        rows[i].style.display = 'none';
      } else {
        rows[i].style.display = 'table-row';
      }
    }
  }
}

