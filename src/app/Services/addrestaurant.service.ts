import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantViewModel } from 'Models/RestaurantViewModel';
@Injectable({
  providedIn: 'root'
})
export class AddrestaurantService {
  private apiUrl='http://localhost:5255/api';
  constructor(private http:HttpClient) { }
  AddRestaurant(newRestaurant:RestaurantViewModel){
    return this.http.post<any>(this.apiUrl+"/Restaurant/newRestaurant",newRestaurant,{observe:'response'});
  }

}
