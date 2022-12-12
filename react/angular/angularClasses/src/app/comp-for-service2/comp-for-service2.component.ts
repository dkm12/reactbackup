import { Component, OnInit } from '@angular/core';
import { NumlistService } from '../numlist.service';

@Component({
  selector: 'app-comp-for-service2',
  templateUrl: './comp-for-service2.component.html',
  styleUrls: ['./comp-for-service2.component.css'],
  providers:[NumlistService]
})
export class CompForService2Component implements OnInit {
  
  list1:number[]=[];
  constructor(private _numlistService: NumlistService) { }

  ngOnInit(): void {
    this.list1=this._numlistService.getlist();
 }
  addnumber(val: any) {
  this._numlistService.addList(val);
 }

}
