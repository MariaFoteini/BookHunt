import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../shared/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  query: string = '';
  
  constructor(private bookService: BookService, private router: Router) {}

  onSearch() {
    if(this.searchQuery.value) {
      this.router.navigate(['search', this.searchQuery.value]);
      this.bookService.getBooks(this.searchQuery.value);
    }
  }

  ngOnInit() {
    this.query = this.route.snapshot.paramMap.get('q') || '';
    if(this.route.snapshot.paramMap.get('q')) {
      this.bookService.getBooks(this.query);
    } 
  }
}
