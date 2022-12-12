import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HpagemcontentComponent } from './hpagemcontent/hpagemcontent.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { NgfoorComponent } from './ngfoor/ngfoor.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MypipePipe } from './mypipe.pipe';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { RegfortempdrivenComponent } from './regfortempdriven/regfortempdriven.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';
import{ BookService} from './book.service'
import{InMemoryWebApiModule} from 'angular-in-memory-web-api'
import { testData} from './testdata'
import { HttpClientModule} from '@angular/common/http';
import { ObserveApiComponent } from './observe-api/observe-api.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HpagemcontentComponent,
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
    NgfoorComponent,
    MypipePipe,
   
    PageNotFoundComponentComponent,
        RegfortempdrivenComponent,
        ReactiveformComponent,
         ObserveApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(testData)


  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
