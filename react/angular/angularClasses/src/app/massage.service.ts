import { Injectable } from '@angular/core';
import { Servicecomponent2Service } from './servicecomponent2.service';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class MassageService {

  constructor(private _Servicecomponent2Service: Servicecomponent2Service) {
 
  }

  massage() {
    return "testing method"
  }
  massage2(){
    return this._Servicecomponent2Service.testingMethod2();

  }

}
