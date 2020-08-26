import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyService } from 'src/app/my.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit ,OnDestroy{
  id
  products
  vendor: any
  subscription: Subscription
  constructor(private toServer: MyService, private router: Router) { }

  ngOnInit(): void {
    this.vendor = JSON.parse(localStorage.getItem('data'));
    console.log(this.vendor);
    this.id = this.vendor._id
    this.subscription = this.toServer.getFarmerproducst(this.id)
      .subscribe((res: any) => {
        this.products = res.resp.products
        console.log("===>", this.products);
      })
  }


  edit(item) {
    this.router.navigate(['farmer', 'edit'], { state: item })
  }


  delete(item) {
    this.subscription = this.toServer.deleteproduct(this.vendor._id, item._id)
      .subscribe(res => {
        this.products = this.products.filter((elem, index) => {
          return elem._id !== item._id
        })
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
   
  }


}
