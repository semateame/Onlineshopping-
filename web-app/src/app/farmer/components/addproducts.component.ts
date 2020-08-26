import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MyService } from 'src/app/my.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addproducts',
  templateUrl: './addproducts.component.html',
  styleUrls: ['./addproducts.component.css']
})
export class AddproductsComponent implements OnInit , OnDestroy{
  addForm
  upload
  vendor: any
  subscription:Subscription
  constructor(private frm: FormBuilder, private info: MyService, private router: Router) {
    this.addForm = frm.group({
      "name": ['', Validators.required],
      'price': ['', Validators.required],
      'qauntity': ['', Validators.required],
      'image': ['', Validators.required],
      'description': ['']
    })
  }

  ngOnInit(): void {
    this.vendor = JSON.parse(localStorage.getItem('data'))
  }
  onAdd() {
    this.subscription = this.info.uploadimage(this.upload)
      .subscribe(res => { })
    let id = this.vendor._id
    this.subscription = this.info.addproduct(id, this.addForm.value)
      .subscribe(res => {
        this.router.navigate(['farmer', 'list'])
      })



  }


  changehandler(event) {
    this.upload = <File>event.target.files[0]
    this.addForm.value.image = this.upload.name
    console.log(this.addForm.value);

  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
    
  }
}
