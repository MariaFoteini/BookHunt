import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Book } from '../../models/book.models';
import { NgIf, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-book',
  imports: [MatCardModule, NgIf, SlicePipe, ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  response:any;
  @Input() book: Book = {
    id: '',
    title: '',
    image: '',
    authors: '',
    categories: '',
    pageCount: 0,
    publishedDate: '',
    textSnippet: ''
  }

}
