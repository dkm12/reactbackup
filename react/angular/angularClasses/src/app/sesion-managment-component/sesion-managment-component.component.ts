import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion-managment-component',
  templateUrl: './sesion-managment-component.component.html',
  styleUrls: ['./sesion-managment-component.component.css']
})
export class SesionManagmentComponentComponent implements OnInit {

  constructor() {

sessionStorage.setItem("userId1", "Vidit Mishra")

   }

 employeeDetail={ name: 'deepak Mishra', UserID :201, gender:'male', age:26}  
 setObj(){
localStorage.setItem("compobj", JSON.stringify(this.employeeDetail))
}
   storeusername(){
    localStorage.setItem("userId", "Deepak Mishra")
    localStorage.setItem("name", "akshat Mishra")

   } 

  ngOnInit(): void {
  }

}
