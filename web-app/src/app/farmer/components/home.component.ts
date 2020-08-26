import { Component, OnInit, OnDestroy} from "@angular/core";
import { MyService } from "src/app/my.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.components.html",

  styleUrls: ["./home.componets.css"],
})
export class HomeComponent implements OnInit, OnDestroy{
  subscription
  upload;
  profile:any
  products
  role :boolean
  constructor(private info: MyService, private router: Router) {}

  displayedColumns = ['Product-name', 'Price', 'Quantity'];

  ngOnInit(): void {
   this.profile =JSON.parse(localStorage.getItem('data'));
   if(this.profile.role=="admin"){
      this.role = false
   }else{
    this.role = true
   }

    let id = this.profile._id
    
   this.subscription = this.info.getFarmerproducst(id)
      .subscribe((res: any) => {
        this.products = res.resp.products
       
      })
  }
  changeHandler(e) {
    this.upload = <File>e.target.files[0];
    console.log(this.upload);
  }
  uploadImage() {
   this.subscription= this.info.uploadimage(this.upload).subscribe((res) => {
      
      this.router.navigate(['farmer','home'])
    });
    let data = { imgName: this.upload.name };
    this.info.profile(data, this.profile._id).subscribe((res) => {
      
    });

  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();

  }
 
}
