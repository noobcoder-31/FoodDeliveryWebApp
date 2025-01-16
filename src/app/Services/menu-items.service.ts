import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItems } from 'Models/MenuItems';
import { MenuItemsViewModel } from 'Models/MenuItemsViewModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {
    private apiUrl = 'http://localhost:5255/api';
    httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};
    constructor(private http: HttpClient) { }

  AddMenuItems(newMenuItems: MenuItems) {
    return this.http.post<any>(this.apiUrl + "/Menu/newMenuItems", newMenuItems, { observe: 'response' });
  }

  GetMenuItems():Observable<MenuItemsViewModel[]>{
    return this.http.get<MenuItemsViewModel[]>(this.apiUrl+ "/Menu/allMenuItems");
  }

  GetMenuItemsByRestaurant(id:number):Observable<MenuItemsViewModel[]>{
    return this.http.get<MenuItemsViewModel[]>(this.apiUrl+"/Menu/getmenu/"+id);
  }

  UpdateMenuItems(id:number,updatemenuItems : MenuItems) : Observable<any>{
     return this.http.put<any>(this.apiUrl + "/Menu/updateMenuItems/"+id,updatemenuItems,this.httpOptions);
  }

  DeleteMenuItems(id : number):Observable<any>{
    return this.http.delete<any>(this.apiUrl + "/Menu/deleteMenuItems/" + id );
  }
}
