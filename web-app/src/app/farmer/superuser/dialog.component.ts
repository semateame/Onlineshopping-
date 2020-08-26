import { Component, OnInit, inject, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MyService } from "src/app/my.service";
import { Subscription } from 'rxjs';
@Component({
  selector: "app-dialog",
  template: `
    <mat-dialog-content>
      <h3 mat-dialoag-title>Enter new password</h3>
      <mat-form-field appearance="outline">
        <input type="password"  matInput placeholder="password" #inpt />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button
        mat-raised-button
        mat-dialog-close
        color="warn"
        (click)="onSubmit(inpt)"
      >
        submit
      </button>
    </mat-dialog-actions>
  `,
  styles: [],
})
export class DialogComponent implements OnInit ,OnDestroy{
  subscription:Subscription
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private info: MyService
  ) {}

  ngOnInit(): void {}

  onSubmit(e) {
  console.log(e.value);
    let Data = {
      email: this.data.email,
      password: e.value,
    };

   this.subscription= this.info.resetPassword(Data)
    .subscribe(res=>{}
    )
  }


  ngOnDestroy() {
    if (this.subscription)this.subscription.unsubscribe();
  }
}
