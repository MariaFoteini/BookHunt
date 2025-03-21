import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../shared/books/book.service';

@Component({
  selector: 'app-search-bar',
  imports: [
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchQuery = new FormControl('');
  query: string = '';
  constructor(private bookServise: BookService) {}

  onSearch() {
    if(this.searchQuery.value) {
      this.query = this.searchQuery.value;
      this.bookServise.getBookList(this.query);
    }
  }
}
