import { NgModule } from '@angular/core';
import { Routes, RouterModule,  PreloadAllModules } from '@angular/router';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { HomeComponent } from './farmer/components/home.component';
import { MyGuard } from './my.guard';


const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  
{path:'farmer',loadChildren:()=>(import("./farmer/farmer.module").then(m=>m.FarmerModule)),canActivate:[MyGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:PreloadAllModules, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
