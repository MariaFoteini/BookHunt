import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Books } from '../../models/books.models';
import { Book } from '../../models/book.models';
import { Pagination } from '../../models/pagination.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private key = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private route = inject(ActivatedRoute);


  // BehaviorSubject to store and share the book data
  private bookListSubject = new BehaviorSubject<Books[]>([]);
  private bookSubject = new BehaviorSubject<Book[]>([]);
  bookList$ = this.bookListSubject.asObservable(); // Expose as Observable
  book$ = this.bookSubject.asObservable(); // Expose as Observable

  // BehaviorSubject to store and share pagination options and data
  pagination: Pagination = {
    startIndex: 1,
    pageOptions: [10, 20, 40],
    length: 1000,
    pageSize: 20,
    pageIndex: 0,
    previousPageIndex: 0,
  }

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  // Fetch books from the API and update the BehaviorSubject
  public getBooks(query: string, projection?: string, paginationOption?: Pagination): void {

    this.getUrlParameters();
    // Search Filters 
    // 1. projection filters
    if (projection == undefined || projection == '') {
      projection = "full";
    }

    // 2. Pagination Filters
    let pageSize = 10;
    let startIndex = 0;
    if (paginationOption?.pageSize) {
      pageSize = paginationOption.pageSize;

    }
    if (paginationOption?.pageIndex) {
      startIndex = paginationOption.pageIndex;
    }

    // 3. Sorting Filters
    // 4. Book's type Filters

    const params = new HttpParams()
      .set('key', this.key)
      .set('q', query)
      // .set('projection', projection)
      .set('startIndex', startIndex*pageSize) //  The position in the collection at which to start.
      .set('maxResults', pageSize);           //The maximum number of results to return.

    this.http.get<any>(this.apiUrl, {
      responseType: 'json',
      observe: 'body',
      params: params,
    }).pipe(
      map((response) => {
        // Map the response to the Books[] type
        console.log("response", response.items);
        return response.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo?.title || 'No Title', // Provide a default value
          authors: item.volumeInfo?.authors, // Join authors and provide a default value
          image: item.volumeInfo?.imageLinks?.thumbnail || 'path/to/default-image.png', // Provide a default image
          categories: item.volumeInfo?.categories, // Provide a default empty array
          pageCount: item.volumeInfo?.pageCount || 0, // Default to 0 if rating is missing
          publishedDate: item.volumeInfo?.publishedDate || 0, // Default to 0 if rating is missing
          language: item.volumeInfo.language,
        }));
      })
    ).subscribe({
      next: (bookList) => {
        this.bookListSubject.next(bookList); // Update the BehaviorSubject with the new data
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      },
    });
  }

  // Fetch book from the API and update the BehaviorSubject
  public getBookById(query: string, projection?: string): void {
    let bookApiUrl = this.apiUrl + "/" + query;
    console.log("Get Book: ",bookApiUrl)

    if (projection == undefined) {
      projection = "full";
    }
    const params = new HttpParams()
      .set('key', this.key)

    this.http.get<any>(bookApiUrl, {
      responseType: 'json',
      observe: 'body',
      params: params,
    }).pipe(
      map((response) => {
        // Map the response to the Book[] type
        console.log("getBook response", response);
        return {
          id: response.id,
          language: response.volumeInfo.language,
          title: response.volumeInfo?.title || 'No Title', // Provide a default value
          subtitle: response.volumeInfo?.subtitle || 'No Title', // Provide a default value
          authors: response.volumeInfo?.authors, // Join authors and provide a default value
          publisher: response.volumeInfo?.publisher, // Join authors and provide a default value
          images:{
            small:response.volumeInfo?.imageLinks?.small,
            medium:response.volumeInfo?.imageLinks?.medium, 
            large:response.volumeInfo?.imageLinks?.small, 
            thumbnail:response.volumeInfo?.imageLinks?.thumbnail, 
            extraLarge:response.volumeInfo?.imageLinks?.extraLarge, 
          },
          categories: response.volumeInfo?.categories, 
          description: response.volumeInfo.description,
          textSnippet: response.searchInfo?.textSnippet, 
          publishedDate: response.volumeInfo?.publishedDate, 
          pageCount: response.volumeInfo?.pageCount, 
          previewLink: response.volumeInfo.previewLink,
          buyLink: response?.saleInfo.buyLink,
          retailPrice: response?.saleInfo?.retailPrice?.amount,
          currencyCode: response?.saleInfo?.retailPrice?.currencyCode,
        };
      })
    ).subscribe({
      next: (book) => {
        this.bookSubject.next([book]); // Wrap single book in array if BehaviorSubject expects
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      },
    });
  }

  public updatePageResults( pagination: Pagination, query:string) {
    console.log("active route", query, " , pagination:",pagination);
    this.getBooks(query, 'full', pagination)
  }

  
  private getUrlParameters() {
    this.activatedRoute.paramMap.subscribe(params => {
      const q = params.get('page');
      console.log('q',q);
    });
    console.log('get Url parameters',this.activatedRoute.queryParamMap);
    console.log('snap:', this.activatedRoute.snapshot.queryParams)
    console.log('params:', this.activatedRoute.params)
    console.log("router", this.router.url);
    let query = this.route.snapshot.paramMap.get('q') || '';
    if(this.route.snapshot.paramMap.get('q')) {
      console.log("q", query)
    } 

  }

  parseUrl() {
    const urlTree = this.router.parseUrl(this.router.url);
    
    // Path parameters
    const pathSegments = urlTree.root.children['primary']?.segments.map(s => s.path);
    
    // Query parameters
    const queryParams = urlTree.queryParams;
    
    // Hash fragment
    const hashFragment = urlTree.fragment;
    
    return {
      pathSegments,
      queryParams,
      hashFragment
    };
  }

}
