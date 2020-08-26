import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from 'src/app/my.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit ,OnDestroy{
  editForm
  product
  vendor: any
  subscription: Subscription
  constructor(private frm: FormBuilder, private router: Router, private toServer: MyService) {
    this.product = this.router.getCurrentNavigation().extras.state
    this.editForm = this.frm.group({
      "name": [this.product.name, Validators.required],
      "price": [this.product.price, Validators.required],
      "image": [this.product.image, Validators.required],
      "description": [this.product.description, Validators.required]
    })

  }

  ngOnInit(): void {


  }
  onEdit() {
    this.vendor = JSON.parse(localStorage.getItem('data'))
    this.subscription = this.toServer.editproduct(this.vendor._id, this.product._id, this.editForm.value)
      .subscribe(resp => {
        this.router.navigate(['farmer', 'list'])
      })
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  
  }
}
