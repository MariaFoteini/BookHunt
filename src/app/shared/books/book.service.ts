import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Books } from '../../models/books.models';
import { Book } from '../../models/book.models';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private key = environment.apiKey;
  private apiUrl = environment.apiUrl;

  // BehaviorSubject to store and share the book data
  private bookListSubject = new BehaviorSubject<Books[]>([]);
  private bookSubject = new BehaviorSubject<Book[]>([]);
  bookList$ = this.bookListSubject.asObservable(); // Expose as Observable
  book$ = this.bookSubject.asObservable(); // Expose as Observable

  constructor(private http: HttpClient) {}

  // Fetch books from the API and update the BehaviorSubject
  public getBooks(query: string, projection?: string): void {
    if (projection == undefined) {
      projection = "full";
    }
    const params = new HttpParams()
      .set('key', this.key)
      .set('q', query)
      .set('projection', projection);

    this.http.get<any>(this.apiUrl, {
      responseType: 'json',
      observe: 'body',
      params: params,
    }).pipe(
      map((response) => {
        // Map the response to the Books[] type
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

}
