import { Routes, UrlSegment } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { BookDetailComponent } from './user/book-detail/book-detail.component';
import { MainPageComponent } from './user/main-page/main-page.component';

export const routes: Routes = [
      {path: '', component: MainPageComponent},
      {path: 'book/:id', component: BookDetailComponent},
      {path: '**', component: PageNotFoundComponent},

];
