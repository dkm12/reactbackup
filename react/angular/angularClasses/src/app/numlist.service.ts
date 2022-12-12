import { Injectable } from '@angular/core';

@Injectable()

export class NumlistService {
numList:number[]=[100];

  constructor() { }

public addList(val:number){
  this.numList.push(val);
}

public getlist(){
 
  return this.numList;
}

}
