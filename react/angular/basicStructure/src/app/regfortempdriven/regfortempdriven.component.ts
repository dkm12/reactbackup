import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regfortempdriven',
  templateUrl: './regfortempdriven.component.html',
  styleUrls: ['./regfortempdriven.component.css']
})
export class RegfortempdrivenComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }



  location=['Delhi','Mubmbai', 'Bihar', 'Uttar pradesh' ]
  region=['South', 'North', 'East', 'West']
  department=['Software', 'Sales', 'Networking', 'infra']
  designation=['Software Engginer', 'Sr. Software Engginer', 'Tech Lead', 'Team Lead', 'APM', 'PM',]
  
 

 
  lastName:any;
  emailAddress:any
  Register(regForm:any){

    
 const firstName = regForm.controls.firstName.value;
console.log(firstName);
var lastName = regForm.controls.lastName.value;
var emailAddress = regForm.controls.emailAddress.value;


console.log(regForm);

  }

}
