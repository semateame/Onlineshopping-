import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyService } from 'src/app/my.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit ,OnDestroy{
  subscribtion: Subscription
  Data: any
  arr
  constructor(private info: MyService) { }

  ngOnInit(): void {

    this.subscribtion = this.info.getFarmers()
      .subscribe((res: any) => {
        this.Data = res
        this.arr = [...this.Data]
      })
  }
  // filterBydate(e) {
  //   console.log(e.value);

  //   if (e.value == "") {
  //     this.arr = this.Data
  //   }
  //   else{
  //     this.Data = this.arr.map((item)=>{
  //       return item.orders.filter(i=>{
  //         return i.date == e.value
  //       })
  //     })
  //   }
  //   console.log(this.Data);
  // }


  ngOnDestroy() {
    if (this.subscribtion){
      this.subscribtion.unsubscribe();

    }
  }
}
