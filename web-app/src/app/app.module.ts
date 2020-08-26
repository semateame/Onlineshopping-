import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './auth/signup.component';
import { LoginComponent } from './auth/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MyInterceptor } from './my-.interceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
// import { HomeComponent } from './farmer/components/home.component';
//import { AboutComponent } from './about.component';
//import { ListProductsComponent } from './farmer/components/list-products.component';
import {MatMenuModule} from '@angular/material/menu';
const config = {
  breakPoints: {
      xs: {max: 600},
      sm: {min: 601, max: 959},
      md: {min: 960, max: 1279},
      lg: {min: 1280, max: 1919},
      xl: {min: 1920}
  },
  debounceTime: 100
};
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
  
 
   
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [{ provide:HTTP_INTERCEPTORS, useClass:MyInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
