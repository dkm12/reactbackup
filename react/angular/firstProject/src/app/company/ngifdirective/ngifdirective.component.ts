import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngifdirective',
  templateUrl: './ngifdirective.component.html',
  styleUrls: ['./ngifdirective.component.css']
})
export class NgifdirectiveComponent implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
  }
  hdheading=true;
  clickme()
  {
alert("click massage");

  }
isvalid:boolean=true;
changevalue(valid: boolean){
this.isvalid=valid;

  }

}
