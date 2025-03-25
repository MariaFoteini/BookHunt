import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './user/book-list/book-list.component';
import { SearchBarComponent } from './user/search-bar/search-bar.component';
import { NavbarComponent } from './user/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BookListComponent,
    SearchBarComponent,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BookHunt';
}
