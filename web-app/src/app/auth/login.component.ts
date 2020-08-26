import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from '../my.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm
  isSigned :boolean =true
  
  constructor(private frm: FormBuilder, private route: Router, private toServer: MyService) {
    this.loginForm = frm.group({
      'email': ['', [Validators.required] ],
      'password': ['', Validators.required],
      'role': ['vendor', Validators.required]
    })
  }
  
  ngOnInit(): void {
  }
  onSubmit() {
let user = {...this.loginForm.value}
if (user.email==="samotiteame@gmail.com") user.role='admin'

    this.toServer.login(user)
      .subscribe((subs:any) => {
        
       localStorage.setItem('token',subs.token)
       console.log(subs);
        if (localStorage.getItem('token')) {
         this.isSigned=true
         localStorage.setItem('data',JSON.stringify(subs.vendor))
          this.route.navigate(['farmer'])
        }
        else this.isSigned =false
        
      })
  }
}
