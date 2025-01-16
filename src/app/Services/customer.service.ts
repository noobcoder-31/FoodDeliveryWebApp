import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'Models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

private apiUrl = 'http://localhost:5255/api';
httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};

getCustomerByUserid(userId:number):Observable<Customer>{
  const token = localStorage.getItem('loginToken'); // Replace 'token' with the actual key used to store the token

        // Create headers with the token
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
  return this.http.get<Customer>(this.apiUrl+"/Customer/customerbyuserid/"+userId,{headers});
}

createCustomer(newcustomer:Customer){
  return this.http.post<any>(this.apiUrl+"/Customer/newCustomer",{observe:'response'});
}
updateCustomer(id:number,updatedcustomer:Customer){
  const token = localStorage.getItem('loginToken');
  console.log(token);
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  });
  return this.http.put<any>(this.apiUrl+"/Customer/updateCustomer/"+id,updatedcustomer,{headers});
}
}
