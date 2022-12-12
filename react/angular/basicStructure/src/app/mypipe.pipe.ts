import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: ' '
})
export class MypipePipe implements PipeTransform {

  transform(value:string, gender: string):any {
//        if(gender.toLowerCase()=="male"){
// return "Mr." +value;
// }
  }

}
