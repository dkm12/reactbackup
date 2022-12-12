

export class Customer {
  custmerId: number;
  custmerName: string;
  custmerSalery: Number;

  constructor(custId: number, custName: string, custSlery: number) {
    this.custmerName = custName;
    this.custmerId = custId;
    this.custmerSalery = custSlery
  }
  display() {
    console.log("customer name is : " + this.custmerName + ", customer Id is : " + this.custmerId + "customer salery is : " + this.custmerSalery )
  }
}
