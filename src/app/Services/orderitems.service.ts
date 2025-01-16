import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Orderitems } from 'Models/Orderitems';

@Injectable({
  providedIn: 'root'
})
export class OrderitemsService {
  private apiUrl = 'http://localhost:5255/api';
  constructor(private http:HttpClient) { }
  
  createOrderItem(orderitem:Orderitems){
    return this.http.post<Orderitems>(this.apiUrl+"/OrderItem/neworderItem",orderitem,{observe:'response'});
  }
}
