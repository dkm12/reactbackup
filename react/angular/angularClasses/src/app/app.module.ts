import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { PipeExampleComponent } from './pipe-example/pipe-example.component';
import { WelocmePipe } from './welocme.pipe';
import { ReversePipe } from './reverse.pipe';
import { WordlimitPipe } from './wordlimit.pipe';
import { SesionManagmentComponentComponent } from './sesion-managment-component/sesion-managment-component.component';
import { SesionManagmentComponentBComponent } from './sesion-managment-component-b/sesion-managment-component-b.component';
import { InputDecoratorParentComponent } from './input-decorator-parent/input-decorator-parent.component';
import { InputDecoratorChildComponent } from './input-decorator-child/input-decorator-child.component';
import { TypescritclassComponent } from './typescritclass/typescritclass.component';
import { MassageService } from './massage.service';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { Servicecomponent2Service } from './servicecomponent2.service';
import { AccountHolder1Component } from './account-holder1/account-holder1.component';
import { AccountHolder2Component } from './account-holder2/account-holder2.component';
import { CompForService1Component } from './comp-for-service1/comp-for-service1.component';
import { CompForService2Component } from './comp-for-service2/comp-for-service2.component';
import { NumlistService } from './numlist.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClassExampleComponent } from './class-example/class-example.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { ChildComponent2Component } from './child-component2/child-component2.component';
import { SubChildComponent1Component } from './sub-child-component1/sub-child-component1.component';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent,
    PipeExampleComponent,
    WelocmePipe,
    ReversePipe,
    WordlimitPipe,
    SesionManagmentComponentComponent,
    SesionManagmentComponentBComponent,
    InputDecoratorParentComponent,
    InputDecoratorChildComponent,
    TypescritclassComponent,
    ServiceComponentComponent,
    AccountHolder1Component,
    AccountHolder2Component,
    CompForService1Component,
    CompForService2Component,
    DashboardComponent,
    PageNotFoundComponent,
    ClassExampleComponent,
    ChildComponentComponent,
    ChildComponent2Component,
    SubChildComponent1Component,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [MassageService,Servicecomponent2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
