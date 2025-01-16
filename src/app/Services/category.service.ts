import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'Models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl='http://localhost:5255/api';
  
  httpOptions={headers:new HttpHeaders({'Content-type':'application/json'})};

  constructor(private http:HttpClient) { }

  AddCategory(newCategory:Category){
    return this.http.post<any>(this.apiUrl+"/Category/newCategory",newCategory,{observe:'response'});
  }
  getAllCategory(){
    return this.http.get<any>(this.apiUrl+"/Category");
  }

  UpdateCategory(id:number,updateCategory : Category) : Observable <any>{
    return this.http.put<any>(this.apiUrl + "/Category/updateCategory"+id, updateCategory,this.httpOptions);
  }
  DeleteCategory(id : number):Observable<any>{
    return this.http.delete<any>(this.apiUrl + "/Category/deleteCategory" + id , {observe : 'response'});
  }

}
