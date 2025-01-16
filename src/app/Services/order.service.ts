import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'Models/Order';
import { OrderDetailsViewModel } from 'Models/OrderDetailsViewModel';
import { OrdersByUserId } from 'Models/OrdersbyUserId';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5255/api';
  httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};
  constructor(private http:HttpClient) { }

  GetOrdersByRestaurant(id:number):Observable<OrderDetailsViewModel[]>{
    return this.http.get<OrderDetailsViewModel[]>(this.apiUrl+"/Order/orderdetails/"+id);
  }

  UpdateOrderStatus(id:number,order:Order):Observable<any>{
    return this.http.put<Order>(this.apiUrl+"/Order/updateStatus/"+order.orderId,order,this.httpOptions);
  }

  createOrder(order:Order){
    return this.http.post<Order>(this.apiUrl+"/Order/newOrder",order,{ observe: 'response' });
  }

  getOrdersByUserId(id:number):Observable<OrdersByUserId[]>{
    return this.http.get<OrdersByUserId[]>(this.apiUrl+"/Order/orders/"+id);
  }
}
