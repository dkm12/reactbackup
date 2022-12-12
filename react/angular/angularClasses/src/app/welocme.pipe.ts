import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'welocme'
})
export class WelocmePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    return "Mr "  +   value ;
  }
  

}
