import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MyService } from "src/app/my.service";
import { Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogComponent } from "src/app/farmer/superuser/dialog.component";

@Component({
  selector: "tabletemplate",
  templateUrl: "./tabletemplate.component.html",
  styleUrls: ["./tabletemplate.component.css"],
  inputs: ["users"],
})
export class TabletemplateComponent implements OnInit,OnDestroy {
  users;
  isChecked;
  subscription: Subscription;
  constructor(
    private info: MyService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  displayedColumn: string[] = ["Name", "Email", "manage", "restPswd"];
  ngOnInit(): void {
    console.log(this.users);
  }

  onManage(element) {
    const Id = { id: element._id };
    if (element.role === "customer") {
     this.subscription= this.info.customeractivity(Id).subscribe((res) => {console.log(res);});
    } else {
     this.subscription= this.info.farmeractivity(Id).subscribe((res) => {});
    }
  }

  onReset(info) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { email: info.email },
      width:'400',
      height:'200'
      
    });
  }


  ngOnDestroy() {
    if (this.subscription){
      this.subscription.unsubscribe();

    }
  }
}
