import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../models/book.models';
import { NgIf, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [
    MatCardModule,
    NgIf,
    SlicePipe,
    RouterLink,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookList?: Book[] = [];

  response:any;  
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

  constructor(private router: Router) {}

  routerLinkKeyUpTrigger(id: string) {
    this.router.navigate(['book', id]);
  }

}
