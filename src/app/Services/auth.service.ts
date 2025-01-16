import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { login } from 'Models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:5255/api/User";

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getIsLoggedIn());
  private userRoleSubject = new BehaviorSubject<string>(this.getUserRole());
  private useridSubject= new BehaviorSubject<string>(this.getUserid());
  constructor(private http: HttpClient) {}

  private getIsLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  private getUserid():string{
    return localStorage.getItem('userId') || '';
  }
  private getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  setLoginStatus(isLoggedIn: boolean, role: string): void {
    this.isLoggedInSubject.next(isLoggedIn);
    this.userRoleSubject.next(role);
  }

  Login(user: login) {
    return this.http.post<any>(`${this.url}/Login`, user, { observe: 'response' });
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next('');
  }


  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }

  get userRole() {
    return this.userRoleSubject.asObservable();
  }
  
  get userid(){
    return this.useridSubject.asObservable();
  }
}
