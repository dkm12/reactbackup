import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ngfoor',
  templateUrl: './ngfoor.component.html',
  styleUrls: ['./ngfoor.component.css']
})
export class NgfoorComponent implements OnInit {
employes:any[];
  constructor(private router:Router) { 
this.employes=[
    {'employeeid':1 , 'name':'Deepak Mishra', 'age':'32', 'mobileNumber' : '8287774111'},
    {'employeeid':2 ,'name':'kamla kant Mishra' , 'age':'32', 'mobileNumber' : '8287774111'},
    {'employeeid':3 ,'name':'sapna Mishra' ,'age':'32', 'mobileNumber' : '8287774111'},
    {'employeeid':4 ,'name':'vidit Mishra', 'age':'32', 'mobileNumber' : '8287774111'},
    {'employeeid':5 ,'name':'prakash Mishra', 'age':'32', 'mobileNumber' : '8287774111'}
    


]




  }

  ngOnInit(): void {
  }

  students:any[]=[
{'name':'Deepak Mishra', 'age':'32', 'mobileNumber' : '8287774111'},
{'name':'kamla kant Mishra' , 'age':'32', 'mobileNumber' : '8287774111'},
{'name':'sapna Mishra' ,'age':'32', 'mobileNumber' : '8287774111'},
{'name':'vidit Mishra', 'age':'32', 'mobileNumber' : '8287774111'},
{'name':'prakash Mishra', 'age':'32', 'mobileNumber' : '8287774111'}
 ]


 countryDetail:any[]=  [
  {
    'country':'India', 'people':[
  {'name':'Deepak'},
  {'name':'Pankaj'},
  {'name':'Praksh'}
  ]  
},


{
  'country':'USA', 'people':[
{'name':'John'},
{'name':'Ron'},
{'name':'Smith'}
]
},

{
  'country':'UK', 'people':[
{'name':'Alex'},
{'name':'Lalita'},
{'name':'Harison'}
]
}
 ]  
 
// ng style data
people:any[]=[
  {'name':'Deepak Mishra', 'country':'India'},
  {'name':'John', 'country':'USA'},
  {'name':'Harison', 'country':'Brazil'},
  {'name':'Vidit Mishra', 'country':'India'},
  {'name':'Smith', 'country':'USA'},
  {'name':'Potter', 'country':'Brazil'}
];

// getcolor(country)
// {
// switch(country)
// {
// case 'India':
// return 'blue';
// case 'Brazil':
// return 'green';
// case 'USA':
// return 'yellow';

// }

// }


colsp:number=3;  
showdata(){
alert("click event example")

}


// data:string='deepak';
data1:string='deepak Kumar';
dob= new Date(1989,1,21);
money:number=75000;

public employee= [
  { "id":1, "name": "Deepak Mishra"},
  { "id":2, "name": "Sapna Mishra"},
  { "id":3, "name": "Vidit Mishra"},
  { "id":4, "name": "Kamla kant Mishra"},
  { "id":5, "name": "Prakash Mishra"}
  
]

Schoolstudent=[
  {"Rollno" : 1, "name":"Deepak Mishra", "gender":"male", "Age": 32},
  {"Rollno" : 2, "name":"Sapna Mishra", "gender":"Female", "Age": 25},
  {"Rollno" : 3, "name":"Vidit Mishra", "gender":"male", "Age": 2},
  {"Rollno" : 4, "name":"Gaytri Mishra", "gender":"Female", "Age": 32},
  {"Rollno" : 5, "name":"Anvi Mishra", "gender":"Female", "Age": 14},
  {"Rollno" : 6, "name":"Akshat Mishra", "gender":"male", "Age": 12},
  {"Rollno" : 7, "name":"Kamla kant Mishra", "gender":"male", "Age": 62},
  {"Rollno" : 8, "name":"Prakash Mishra", "gender":"male", "Age": 28}

]



username:any;
proilrPgr(){

if (this.username == "deepak") 
{
  this.router.navigate(['/profile']);
}

if (this.username !== "deepak") {
    alert("wrong username")
}    


  
}


}

