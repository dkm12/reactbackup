import { Component, OnInit } from '@angular/core';
import{book} from '../book'
import { BookService } from '../book.service';

@Component({
  selector: 'app-observe-api',
  templateUrl: './observe-api.component.html',
  styleUrls: ['./observe-api.component.css']

})
export class ObserveApiComponent implements OnInit {
  softbook: book[] = [];
  constructor( private bookservice:BookService) { }
getsoftBook(){

  this.bookservice.getBooksFromStore().subscribe(book=>this.softbook=book);
}
  ngOnInit(): void {
    this.getsoftBook();
  }

}
