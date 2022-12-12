import { Component, OnInit } from '@angular/core'
import { Customer } from '../customer';

@Component({
  selector: 'app-typescritclass',
  templateUrl: './typescritclass.component.html',
  styleUrls: ['./typescritclass.component.css'],
  viewProviders:[]
})
export class TypescritclassComponent implements OnInit {

  constructor(private _customer:Customer) {


   }




  ngOnInit(): void {
  }

}
