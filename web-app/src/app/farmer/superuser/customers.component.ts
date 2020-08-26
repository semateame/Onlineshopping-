import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyService } from 'src/app/my.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  template: `
  <tabletemplate [users]="customers"></tabletemplate>
  `,
  styles: [
  ]
})
export class CustomersComponent implements OnInit, OnDestroy {
  subscription:Subscription
  customers
  constructor(private info: MyService) { }

  ngOnInit(): void {
    this.info.getCustomers()
      .subscribe(res => {
        console.log(res);
        this.customers = res
      }
      )
  }

  ngOnDestroy() {
    if (this.subscription)this.subscription.unsubscribe();
  }

}
