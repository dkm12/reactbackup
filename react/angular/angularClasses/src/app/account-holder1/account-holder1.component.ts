import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../bank-account.service';

@Component({
  selector: 'app-account-holder1',
  templateUrl: './account-holder1.component.html',
  styleUrls: ['./account-holder1.component.css']
})
export class AccountHolder1Component implements OnInit {

  sumAmount: number;
  constructor(private _bankAccountService: BankAccountService) {
  this.sumAmount = this._bankAccountService.bankSum;

  }


  ngOnInit(): void {


  }

  withdrawAmounts(val: any) {
    console.log("val +" + typeof(val));
    this._bankAccountService.withdrawAmount(val);
    this.sumAmount = this._bankAccountService.bankSum;
  }

  addamounts(val: any) {
    this._bankAccountService.addamount(val);
    this.sumAmount = this._bankAccountService.bankSum;
  }

}
