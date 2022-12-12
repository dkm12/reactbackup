import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgifdirectiveComponent } from './ngifdirective/ngifdirective.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [

    LoginComponent,
    RegistrationComponent,
    NgifdirectiveComponent,
    HeaderComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class CompanyModule { }
