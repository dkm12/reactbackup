import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sesion-managment-component-b',
  templateUrl: './sesion-managment-component-b.component.html',
  styleUrls: ['./sesion-managment-component-b.component.css']
})
export class SesionManagmentComponentBComponent implements OnInit {
  localstoragedata: any;
  empUserId: any;
  empUserId1: any;
  username: any;
  getalldat:any;
  constructor() {
    // this.empUserId=localStorage.getItem("userId")
    // this.empUserId1=sessionStorage.getItem("userId1")

  }
  getusername() {
    this.username = localStorage.getItem("name");
    this.empUserId = localStorage.getItem("userId");
    console.log(JSON.parse(localStorage.getItem('compobj') || '{}'))

  }
  deleteUsername() {
    localStorage.removeItem("name");
    localStorage.removeItem("userId")
  }

  getAndDelete() {
    this.username = localStorage.getItem("name")
    this.empUserId = localStorage.getItem("userId")
    localStorage.removeItem("name");
    localStorage.removeItem("userId")

  }

  getalldata() {
    // for (let i = 0; i < localStorage.length; i++) {
    //   let Key = localStorage.key(i);
    //   let value = localStorage.getItem(Key || '{}');
    //  this.localstoragedata=( Key, value);
    // }

  }

  ngOnInit(): void {
  }

}
