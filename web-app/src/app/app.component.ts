import { Component, OnInit } from '@angular/core';
import { MyService } from './my.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  token

  constructor(private info: MyService,private router:Router) {
  }

  ngOnInit(){
    //this.token= localStorage.getItem("token")

    //this.token = this.info.token
  }
 
}
