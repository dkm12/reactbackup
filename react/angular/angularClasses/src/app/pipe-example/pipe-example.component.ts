import { Component, OnInit,Pipe } from '@angular/core';

@Component({
  selector: 'app-pipe-example',
  templateUrl: './pipe-example.component.html',
  styleUrls: ['./pipe-example.component.css']
})
export class PipeExampleComponent implements OnInit {
nme:string="deepak Mishra";
paragraph:string="Please align Amit Dixit and Deepak Mishra for going to ONGC scope Minar tomorrow for the Work related to ONGC site.";
  constructor() { }

  ngOnInit(): void {
  }

  empdetails = [
    { id: 1, name: 'Deepak Mishra', country: 'India' },
    { id: 2, name: 'Sapna Mishra', country: 'USA' },
    { id: 3, name: 'Vidit Mishra', country: 'UK' },
    { id: 4, name: 'Kamala kant Mishra', country: 'Australia' },
    { id: 5, name: 'Prakash Mishra', country: 'Pakistan' },
    { id: 6, name: 'Akshat Mishra', country: 'Afginistan' },

  ];



}
