import { Component, OnInit, OnDestroy } from "@angular/core";
import { MyService } from "src/app/my.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit, OnDestroy {
  data;
  arr
  vendor: any
  subscription
  constructor(private info: MyService, private router: Router) { }

  ngOnInit(): void {
    this.vendor = JSON.parse(localStorage.getItem('data'))
    this.subscription = this.info
      .getorders(this.vendor._id)
      .subscribe((res: any) => {
        this.data = res.orders;
        this.arr = [...this.data];
        console.log(this.data);
      });
  }


  OnstausChange(id, ref, email) {
    let obj;
    if (ref.value === "ready") {
      obj = { id: id, status: "ready", customerEmail: email, farmerEmail: this.vendor.email };
    }
    if (ref.value === "complete") {
      obj = { id: id, status: "complete", email: email };
    }
    this.subscription = this.info.changestatus(this.vendor._id, obj)
      .subscribe((res) => {
        this.ngOnInit()
      });
  }
  onChange() {

  }
  Filterstatus(e) {
    if (e.value == "") {
      this.data = this.arr;
      console.log("====>", this.data);
    } else {
      this.data = this.arr.filter((item) => {
        return item.status.includes(e.value) == true;
      });
      console.log("******", this.data);
    }
  }

  ngOnDestroy() {
    
    this.subscription.unsubscribe();
  }
}
