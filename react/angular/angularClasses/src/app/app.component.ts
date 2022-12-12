import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularClasses';
  valid:string='male';
  isvalid:number=1;
constructor(private _router:Router){} 
  changeValue(val: number){
    this.isvalid=val;

  }
  changeValued(val1: string){
    this.valid=val1;
}
gotoAboutUs(){
 this._router.navigate(['aboutUs'] )
}


}