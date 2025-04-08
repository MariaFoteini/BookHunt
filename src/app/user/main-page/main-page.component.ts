import { Component } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';


@Component({
  selector: 'app-main-page',
  imports: [
    BookListComponent,
    SearchBarComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
