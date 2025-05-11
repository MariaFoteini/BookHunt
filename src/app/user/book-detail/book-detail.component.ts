import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { DecodeHtmlPipe } from '../../shared/pipes/decode-html.pipe';
import { CurrencyPipe } from '@angular/common';
import { BookService } from '../../shared/books/book.service';
import { Book, bookImages } from '../../models/book.models';

@Component({
  selector: 'app-book-detail',
  imports: [
    NgIf,
    MatChipsModule,
    MatButtonModule,
    DecodeHtmlPipe,
    CurrencyPipe,
  ],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  bookId: string = '';
  private route = inject(ActivatedRoute);

  private images: bookImages = {
    small: '',
    medium: '',
    large: '',
    extraLarge: '',
    thumbnail: '',
  };

  book: Book =  {
    id: '',
    title: '',
    images: this.images,
    authors: [],
    categories: [],
    pageCount: 0,
    publishedDate: '',
    textSnippet: '',
    description: '',
    language: '',
    previewLink: '',
    subtitle: '',
    publisher: '',
    buyLink: '',
    retailPrice: 0,
    currencyCode: ''
  };

  constructor(private bookService: BookService){}

  ngOnInit() {
    console.log("object" , this.book);
    this.bookId = this.route.snapshot.paramMap.get('id') ?? '-1';

    this.bookService.book$.subscribe(([bookObj]) => {
      this.book = bookObj;
      console.log("book details", this.book);
    });

    this.bookService.getBookById(this.bookId);
  }
}
