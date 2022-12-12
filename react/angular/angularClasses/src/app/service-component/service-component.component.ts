import { Component, OnInit } from '@angular/core';
import { MassageService } from '../massage.service';

@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.css']
})
export class ServiceComponentComponent implements OnInit {
massg:any;
massage2:any;
  constructor(private _MassageService:MassageService) { 
this.massg=_MassageService.massage();
}
service2call(){
  this.massage2=this._MassageService.massage2();

}

  ngOnInit(): void {
  }

}
