import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  personDetals=[
{id:1, name:'Deepak Mishra'},
{id:2, name:'Sapna Mishra'},
{id:3, name:'Vidit Mishra'},
{id:4, name:'Kamala kant Mishra'},
{id:5, name:'Prakash Mishra'},
{id:6, name:'Akshat Mishra'},

  ]

  constructor() {}
  getpersonDetail():Promise<any>{
    return new Promise(resolve=>resolve(this.personDetals));
  }
}
