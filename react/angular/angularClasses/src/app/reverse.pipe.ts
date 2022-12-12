import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let str: string = "";
    for (let i = value.length; i >= 0; i--) {
      str = str + value.charAt(i);
    }
    
    return str;
  }

}
