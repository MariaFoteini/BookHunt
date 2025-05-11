import { Component, inject } from '@angular/core';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { BookService } from '../../shared/services/book.service';
import { Pagination } from '../../models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [
    MatPaginatorModule,
  ],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  pagination: Pagination;
  pageEvent?: PageEvent;
  private route = inject(ActivatedRoute);
  query: string = '';

  handlePageEvent(event: PageEvent) {
    this.pagination.length = event.length;
    this.pagination.pageIndex = event.pageIndex;
    this.pagination.pageSize = event.pageSize;
    this.pagination.previousPageIndex = event.previousPageIndex;

    this.query = this.route.snapshot.paramMap.get('q') ?? '';

    this.bookService.updatePageResults(this.pagination, this.query); // fetch books with pagination options

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { 
        page:  event.pageIndex,
        perPage: event.pageSize,
      },
      queryParamsHandling: 'merge' // This preserves other query params
    });
  }
  
  constructor(
    private bookService: BookService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute
  ) {
    this.pagination = this.bookService.pagination;
  }
}
