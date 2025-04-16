import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Books } from '../../models/books.models';
import { NgIf, NgFor, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [
    MatCardModule,
    MatChipsModule,
    NgIf,
    NgFor,
    SlicePipe,
    RouterLink,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookList?: Books[] = [];

  response:any;  
  @Input() book: Books = {
    id: '',
    title: '',
    image: [],
    authors: [],
    categories: [],
    pageCount: 0,
    publishedDate: '',
    language: '',
  }

  constructor(private router: Router) {}

  routerLinkKeyUpTrigger(id: string) {
    this.router.navigate(['book', id]);
  }

}
