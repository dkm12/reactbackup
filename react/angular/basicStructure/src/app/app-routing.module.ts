import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HpagemcontentComponent } from './hpagemcontent/hpagemcontent.component';
import { LoginComponent } from './login/login.component';
import { NgfoorComponent } from './ngfoor/ngfoor.component';
import { ObserveApiComponent } from './observe-api/observe-api.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import { RegfortempdrivenComponent } from './regfortempdriven/regfortempdriven.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  
{path:'', redirectTo: '/login', pathMatch:'full'}  ,
{path:'login', component:LoginComponent},
{path:'hpagemcontent' , component:HpagemcontentComponent},
{path:'registration' , component:RegistrationComponent},
{path:'profile' , component:ProfileComponent},
{path:'decorators' , component:NgfoorComponent},
{path:'reactiveForm' , component:ReactiveformComponent},
{path:'regfortempdriven' , component:RegfortempdrivenComponent},
{path:'observeApi' , component:ObserveApiComponent},
{path:'**', component:PageNotFoundComponentComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
