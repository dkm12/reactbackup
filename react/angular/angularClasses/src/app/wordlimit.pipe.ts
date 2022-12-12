import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordlimit'
})
export class WordlimitPipe implements PipeTransform {

  transform(value: any, limit: any = null, symbol: any = null, ...args: any[]): any {
    let newLimit = limit != null ? limit : 10;
    let newSybol = symbol != null ? symbol : '...........';

    return value.length > newLimit ? value.substring(0, newLimit) + newSybol : value;
  }

}
