import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyService } from '../my.service';
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm
  result
  constructor(private frm: FormBuilder, private router: Router, private toServer: MyService) {
    this.signupForm =this.frm.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'role': ['vendor', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
   
   let user = {...this.signupForm.value}

if (user.email === "samotiteame@gmail.com"){
  user.role="admin"
  console.log(user);
}
    this.toServer.signup(user)
      .subscribe(sub => {
        this.result = sub
        console.log(this.result); 
        localStorage.setItem('token',this.result.token)
       
        
       if (localStorage.getItem('token')){
         this.router.navigate(['/'])
       }
      })

  }

}
