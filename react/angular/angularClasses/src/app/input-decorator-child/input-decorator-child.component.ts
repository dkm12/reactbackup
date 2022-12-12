import { Component,Input, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-decorator-child',
  templateUrl: './input-decorator-child.component.html',
  styleUrls: ['./input-decorator-child.component.css']
})

export class InputDecoratorChildComponent implements OnInit {
@Input() Pdata:any;
@Output() newevent= new EventEmitter();
@Input() msassage:any;

  constructor() { }

  ngOnInit(): void {
  }
  inputvalue(val:any){
    this.newevent.emit(val);

  }

}
