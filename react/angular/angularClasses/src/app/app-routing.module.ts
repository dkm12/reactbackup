import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccountHolder1Component } from './account-holder1/account-holder1.component';
import { AccountHolder2Component } from './account-holder2/account-holder2.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { ClassExampleComponent } from './class-example/class-example.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SubChildComponent1Component } from './sub-child-component1/sub-child-component1.component';

const routes: Routes = [
  {path:"", component:DashboardComponent},
{path:"accountHolder1", component:AccountHolder1Component},
{path:"accountHolder2", component:AccountHolder2Component},
{path:"aboutUs", component:AboutUsComponent},
{path:"classExample/:id", component:ClassExampleComponent},
{path:"Dashboard", 
children:[
  {path:"", component:DashboardComponent},
  {path:"childComponent1", 
  children:[
    {path:"", component:ChildComponentComponent},
    {path:"SubchildComponent1", component:SubChildComponent1Component}
  ]
  },
  {path:"childComponent2", component:SubChildComponent1Component},


]
},




{path:"**", component:PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
