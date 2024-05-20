import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'book-list',
    component: BookListComponent,
  },
  {
    path: 'add-book',
    component: AddBookComponent,
  },
  {
    path: 'edit-book',
    component: UpdateBookComponent,
  },
  {
    path:'about',
    component:AboutComponent,
  },
  {
    path:'book-detail',
    component:BookDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
