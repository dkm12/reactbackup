import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';

import { Display } from '../display';
import { PersonServiceService } from '../person-service.service';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css'],
  viewProviders: [Display],
  encapsulation: ViewEncapsulation.None,
  inputs: ['Pdata'],
  outputs: ['childTop']
})
export class BComponent implements OnInit {
  allpersons: Promise<any>;
  Pdata: any;
  isbold:boolean=true;
  iscolor:boolean=true;
  allclases="bold  txtitalic"
country:any;
currentvalue:boolean=true;
banner="assets/images/cmd-subhash-kumar.jpg"
  childTop = new EventEmitter();
  constructor(private obj1: Display, _PersonService: PersonServiceService) {
    obj1.Show();
    this.allpersons = _PersonService.getpersonDetail();
  }

  ngOnInit(): void {
  }

  onchange(val: any) {
    this.childTop.emit(val);

  }

  empdetails = [
    { id: 1, name: 'Deepak Mishra', country: 'India' },
    { id: 2, name: 'Sapna Mishra', country: 'USA' },
    { id: 3, name: 'Vidit Mishra', country: 'UK' },
    { id: 4, name: 'Kamala kant Mishra', country: 'Australia' },
    { id: 5, name: 'Prakash Mishra', country: 'Pakistan' },
    { id: 6, name: 'Akshat Mishra', country: 'Afginistan' },

  ];

  id = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  personDetals = [
    { id: 1, name: 'Deepak Mishra' },
    { id: 2, name: 'Sapna Mishra' },
    { id: 3, name: 'Vidit Mishra' },
    { id: 4, name: 'Kamala kant Mishra' },
    { id: 5, name: 'Prakash Mishra' },
    { id: 6, name: 'Akshat Mishra' },

  ];
  newData() {
    this.personDetals = [

      { id: 1, name: 'Deepak Mishra' },
      { id: 2, name: 'Sapna Mishra' },
      { id: 3, name: 'Vidit Mishra' },
      { id: 4, name: 'Kamla kant Mishra' },
      { id: 5, name: 'Prakash Mishra' },
      { id: 6, name: 'Akshat Mishra' },
      { id: 7, name: 'anvi Mishra' },

    ]

  }

  trkdata(index: number, personDetals: any) {
    return personDetals.name

  }
  getBgColor(country: any) {
    switch (country) {
      case 'India':
        return 'blue';
      case 'USA':
        return 'red';

    }
    return 0;
  }

  addCssClass(){
   let cssClass={
    bold:this.isbold,
    txtitalic:this.isbold,
    txtcolor:this.isbold
   }
return cssClass
  }


addCssClassForCountry(val:any){
this.country=val;
let newCss={
  txtcolor:this.country == 'India',
  two:this.country == 'Pakistan',
  three:this.country == 'USA',
  four:this.country == 'UK',
}
return newCss
}

currentvalued(){

  this.currentvalue= !this.currentvalue;
}
msg:any;
inputvalue(val:any){
this.msg=val;

}

}
