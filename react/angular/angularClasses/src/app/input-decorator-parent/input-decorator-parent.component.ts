import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-decorator-parent',
  templateUrl: './input-decorator-parent.component.html',
  styleUrls: ['./input-decorator-parent.component.css']
})
export class InputDecoratorParentComponent implements OnInit {
childata:any;
sms:string="Deepak Kumar Mishra ?"
stdentDetail={
name:"Deepak Mishra",
class:10,
rollno:213,
gender:"male"
}
  constructor() { }

  ngOnInit(): void {
  }
  chiledValue(vale:any){
this.childata=vale;
  }

}
