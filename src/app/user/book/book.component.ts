import { Component, importProvidersFrom, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../shared/books/book.service';
import { Book } from '../../models/book.models';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-book',
  imports: [MatCardModule, NgFor, NgIf],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  response:any;
  book: Book = {
    id: "",
    title: 'string',
    image: 'string',
    authors: [],
    categories: []
  }

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBook('forth wing');
  }

  getBook(query: string) {
    this.book = this.bookService.getBook(query);
  }

}
