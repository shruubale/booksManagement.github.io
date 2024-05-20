import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'bookShop';

  // fragment routes

  constructor(private activated_route : ActivatedRoute){  }
  ngOnInit() {
    this.activated_route.fragment.subscribe((value)=>{
      this.jumpTo(value);
    })
  }

  jumpTo(section){
    document.getElementById(section).scrollIntoView({behavior:'smooth'})
  }


}
