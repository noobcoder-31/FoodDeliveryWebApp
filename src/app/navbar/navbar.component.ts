import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  userRole: string = '';
  private authSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the AuthService observables to get the current login state and role
    this.authSubscription = this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.userRole.subscribe((role: string) => {
      this.userRole = role;
    });
    console.log(this.userRole);
  }

  // Logout functionality
  logout(): void {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/home']); 
  }

  ngOnDestroy(): void {
    // Cleanup the subscription when the component is destroyed
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
