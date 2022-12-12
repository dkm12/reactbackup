import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../bank-account.service';

@Component({
  selector: 'app-account-holder2',
  templateUrl: './account-holder2.component.html',
  styleUrls: ['./account-holder2.component.css']
})
export class AccountHolder2Component implements OnInit {
  sumAmount:any;
  constructor(private _bankAccountService: BankAccountService) {
    this.sumAmount= this._bankAccountService.bankSum; 
    
  }


  ngOnInit(): void {
   
     
  }

  withdrawAmounts(val: any) {
    this._bankAccountService.withdrawAmount(val);
    this.sumAmount= this._bankAccountService.bankSum;
  }


}

