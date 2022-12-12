	import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './company/login/login.component';
import { NgifdirectiveComponent } from './company/ngifdirective/ngifdirective.component';
import { RegistrationComponent } from './company/registration/registration.component';


const routes: Routes = [
{path:'' , component:LoginComponent},
{path:'login' , component:LoginComponent},
{path:'registration' , component:RegistrationComponent},
{path:'ngifdirective' , component:NgifdirectiveComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
