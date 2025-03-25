import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Book } from '../../models/book.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private key = environment.apiKey;
  private apiUrl = environment.apiUrl;

  // BehaviorSubject to store and share the book data
  private bookListSubject = new BehaviorSubject<Book[]>([]);
  bookList$ = this.bookListSubject.asObservable(); // Expose as Observable

  constructor(private http: HttpClient) {}

  // Fetch books from the API and update the BehaviorSubject
  public getBookList(query: string): void {
    const params = new HttpParams()
      .set('key', this.key)
      .set('q', query);

    this.http.get<any>(this.apiUrl, {
      responseType: 'json',
      observe: 'body',
      params: params,
    }).pipe(
      map((response) => {
        // Map the response to the Book[] type
        return response.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo?.title || 'No Title', // Provide a default value
          authors: item.volumeInfo?.authors.join(', ') || 'Unknown Author', // Join authors and provide a default value
          image: item.volumeInfo?.imageLinks?.thumbnail || 'path/to/default-image.png', // Provide a default image
          categories: item.volumeInfo?.categories?.join(', ') || 'Unknown Category', // Provide a default empty array
          pageCount: item.volumeInfo?.pageCount || 0, // Default to 0 if rating is missing
          publishedDate: item.volumeInfo?.publishedDate || 0, // Default to 0 if rating is missing
          textSnippet: item.searchInfo?.textSnippet || 0, // Default to 0 if rating is missing
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
}
