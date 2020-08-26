import { Component, OnInit, OnDestroy } from "@angular/core";
import { MyService } from "src/app/my.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.css"],
})
export class LogsComponent implements OnInit, OnDestroy {
  subscribtion: Subscription;
  data;
  arr;
  constructor(private info: MyService) {}

  ngOnInit(): void {
    this.subscribtion = this.info.getLogs().subscribe((res: any) => {
      this.data = res.slice(1);
      console.log(this.data);

      this.arr = this.data.map((item) => {
        let num = item.indexOf("HTTP");
        return item.slice(0, num);
      });
      console.log(this.arr);
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
