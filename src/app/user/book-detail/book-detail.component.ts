import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../shared/books/book.service';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  bookId: string = '';
  private route = inject(ActivatedRoute);

  constructor(private bookService: BookService){}

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id') ?? '-1';
    console.log("book id: ", this.bookId);

    console.log(this.bookService.getBooks(this.bookId));

  }

}
