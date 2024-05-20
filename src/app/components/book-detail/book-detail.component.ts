import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit{

  book;
  bookId;
  
  constructor(private activatedRoute : ActivatedRoute, private service: MainService){}

  ngOnInit(): void {
   this.bookId= this.activatedRoute.snapshot.paramMap.get('id');
    this.book= this.service.getBook(this.bookId).subscribe((response)=>
    {
      this.book = response;
      console.log(this.book)
    })
  }



}
