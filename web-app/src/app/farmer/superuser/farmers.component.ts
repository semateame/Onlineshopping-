import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyService } from 'src/app/my.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-farmers',
  template: `
    <tabletemplate [users]="farmers"></tabletemplate>
  `,
  styles: [
  ]
})
export class FarmersComponent implements OnInit ,OnDestroy{
  farmers: []
  subscription: Subscription
  constructor(private info: MyService) { }

  ngOnInit(): void {
    this.subscription = this.info.getFarmers()
      .subscribe((res: any) => {
        console.log(res);
        this.farmers = res
      })
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
   
  }
}
