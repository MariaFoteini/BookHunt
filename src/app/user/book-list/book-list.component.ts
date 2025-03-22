import { Component } from '@angular/core';
import { BookService } from '../../shared/books/book.service';
import { BookComponent } from '../book/book.component';
import { Book } from '../../models/book.models';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [BookComponent, NgFor, NgIf],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  bookList?: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    // Subscribe to the bookList$ observable to get the latest book data
    this.bookService.bookList$.subscribe((books) => {
      this.bookList = books;
    });
  }

}
