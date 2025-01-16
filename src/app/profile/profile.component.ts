import { Component } from '@angular/core';
import { User } from 'Models/User';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User = {
    role: localStorage.getItem('userRole') || '',
    userid: Number(localStorage.getItem('userId')) || 0,
    email: localStorage.getItem('email') || '',
    profilepicture: localStorage.getItem('profilepicture') || '',
    username: localStorage.getItem('username') || ''
  };

  constructor(private authService:AuthService,private router:Router) {
  }
  logout(): void {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/home']); // Navigate to the home page
  }
}

