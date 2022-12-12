import { Component, OnInit } from '@angular/core';
import { Display } from '../display';
import { Nuenum } from '../nuenum';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css'],
  viewProviders:[Display]
})
export class AComponent implements OnInit {
Cdata:any;
enu=Nuenum;

  constructor(private obj:Display) {
    obj.Show();
   }

   onclick(valu:any){
this.Cdata=valu;

   }





  ngOnInit(): void {
  }

  // employeeDetail=
  // {
  //   name:"deepak", designation:"software engg", city:"delhi"
  // }
  employeeDetail:any; 

}
