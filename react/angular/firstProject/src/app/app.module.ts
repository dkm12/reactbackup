import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
 import { CompanyModule } from './company/company.module';
import { AppRoutingModule } from './app-routing.module';
import { Header1Component } from './header1/header1.component';



@NgModule({
  declarations: [
    AppComponent,
    Header1Component,
    
  ],
  imports: [
    BrowserModule,
 CompanyModule,
   AppRoutingModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
