import { Component, OnInit } from '@angular/core';
import { MyService } from 'src/app/my.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-components', 
  templateUrl: './farmNav.html',
  styleUrls: ['./farmNav.css']
})
export class FarmNav implements OnInit {
 role:boolean
 vendor : any
  constructor(private info :MyService,private router:Router) { }

  ngOnInit(): void {
    this.vendor=JSON.parse(localStorage.getItem('data')) 
    if(this.vendor.role==="admin") this.role=true
    else this.role =false
//console.log(this.info.data);
  }
  showproducts(){
   this.router.navigate(['farmer','list'])

  }
  showorders(){
    this.router.navigate(['farmer','order'])
  }
  addproduct(){
   this.router.navigate(['farmer','add'])
   
  }
  getfarmers(){
    this.router.navigate(['farmer','admin'])
  }
getcustomers(){
  this.router.navigate(['farmer','customer'])
}
  gettransaction(){
    this.router.navigate(['farmer','transaction'])
  }
  getlogs(){
    this.router.navigate(['farmer','logs'])
  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
