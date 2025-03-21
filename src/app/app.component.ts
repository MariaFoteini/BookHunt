import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './user/book-list/book-list.component';
import { SearchBarComponent } from './user/search-bar/search-bar.component';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BookListComponent,
    SearchBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BookHunt';
}
