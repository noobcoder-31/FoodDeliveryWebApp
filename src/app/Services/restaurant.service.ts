import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Restaurant } from 'Models/Restaurant';
import { RestaurantByUserIdViewModel } from 'Models/RestaurantByUserIdViewModel';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:5255/api/Restaurant'; // Replace with your API URL
  httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};
  constructor(private http: HttpClient) { }

  // Get all restaurants
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}`);
  }

  // Get single restaurant by ID
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`);
  }

  getByUserid(userid:number):Observable<RestaurantByUserIdViewModel []>{
    return this.http.get<RestaurantByUserIdViewModel []>(this.apiUrl+"/getByUserId/"+userid);
  }

  updaterestaurantDetails(id:number,restaurant:Restaurant):Observable<any>{
    return this.http.put<Restaurant>(this.apiUrl+"/updateDetails/"+restaurant.restaurantId,restaurant,this.httpOptions);
  }

  deleteRestaurant(id:number):Observable<any>{
    return this.http.delete(this.apiUrl+"/removeRestaurant/"+id);
  }
}
