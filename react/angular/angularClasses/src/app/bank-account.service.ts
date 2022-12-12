import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  bankSum: number = 100;
  bnkBalance: any;
  txtamnt:any;
  constructor() { }

  public withdrawAmount(val: number) {
    this.txtamnt = val;
    this.bnkBalance = this.bankSum - this.txtamnt;
    this.bankSum = this.bnkBalance

  }


  public addamount(val: number) {
    this.txtamnt = val;
    console.log(typeof(this.bankSum));
    console.log(typeof(this.txtamnt))
    this.bnkBalance = (this.bankSum + this.txtamnt);
    this.bankSum = this.bnkBalance

  }

}
