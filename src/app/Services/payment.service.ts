import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment } from 'Models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:5255/api';
  httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};
  constructor(private http:HttpClient) { }

  createPayment(payment:Payment){
    return this.http.post<Payment>(this.apiUrl+"/Payment/newPayment",payment,{observe:'response'});
  }

}
