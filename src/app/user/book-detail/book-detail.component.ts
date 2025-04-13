import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { DecodeHtmlPipe } from '../../shared/pipes/decode-html.pipe';
import { BookService } from '../../shared/books/book.service';
import { Book } from '../../models/book.models';

@Component({
  selector: 'app-book-detail',
  imports: [
    NgIf,
    MatChipsModule,
    MatButtonModule,
    DecodeHtmlPipe,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  bookId: string = '';
  private route = inject(ActivatedRoute);
  bookList: Book[] = [];
  @Input() book: Book = {
    id: '',
    title: '',
    image: [],
    authors: [],
    categories: [],
    pageCount: 0,
    publishedDate: '',
    textSnippet: '',
    description: '',
    language: '',
    previewLink: ''
  }

  constructor(private bookService: BookService){}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') ?? '-1';

    this.bookService.bookList$.subscribe((books) => {
      this.bookList = books;
    });

    this.bookService.getBooks(this.bookId);

    console.log("books", this.bookList.length);
    for (let i = 0; i < this.bookList.length; i++) {
      console.log("book item", this.bookList[i]);
      if(this.bookList[i].id === this.bookId) {
        console.log("found the book", this.bookList[i].id);
        this.book = this.bookList[i];
        break;
      }
    }

  }
}
