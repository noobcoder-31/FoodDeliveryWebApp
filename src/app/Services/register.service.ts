import { Injectable } from '@angular/core';
import { RegisterModel } from 'Models/RegisterModel';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl='http://localhost:5255/api';
  
  Register(registeruser:RegisterModel){
    return this.http.post<any>(this.apiUrl+"/User/Register",registeruser,{observe:'response'});
  }
 
  constructor(private http:HttpClient) { }
}
