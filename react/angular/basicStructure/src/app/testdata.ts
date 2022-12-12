import {InMemoryDbService} from 'angular-in-memory-web-api'; 

export class testData implements InMemoryDbService{
createDb(){
  let bookdetails=[
    {id:100, name:'English', statndard:'fourth'},
    {id:101, name:'math', statndard:'fourth'},
    {id:102, name:'Hindi', statndard:'fourth'},
    {id:103, name:'Science', statndard:'fourth'},

  ];
  return{book:bookdetails};

}
}


