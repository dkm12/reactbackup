import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import {Observable,of, from } from 'rxjs';
import{book} from './book'



@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookUrl="/api/book";

  constructor(private http:HttpClient) { }
 getBooksFromStore():Observable<book[]>{
return this.http.get<book[]>(this.bookUrl);

 }
}
