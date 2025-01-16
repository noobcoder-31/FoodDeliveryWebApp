import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'Models/User';
import { AuthService } from '../Services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  currentuser: User;
  inLogin: boolean = true;
  loader: boolean = false;
  isLoggedIn: string = 'false';  // Using string to match your condition

  constructor(private service: AuthService, private router: Router) { }

  onClicklog() {
    this.inLogin = true;
  }

  onClickreg() {
    this.inLogin = false;
  }

  OnSubmit(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all required fields!',
      });
      return;
    }

    this.loader = true;
    let loginuser = form.value;

    // Call the login method from AuthService
    this.service.Login(loginuser).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(res);
        const token = res.body.token;  // Token returned by API
        const role = res.body.role;    // Role returned by API
        const id=res.body.userId; // User ID returned by API
        const email = res.body.email;
        const profilepicture = res.body.profilePicture;
        const username = res.body.username;

        // Save token and role in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('loginToken', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('email', email);
        localStorage.setItem('profilepicture', profilepicture);
        localStorage.setItem('username', username);

        // Notify AuthService of login status
        this.service.setLoginStatus(true, role);

        // Provide feedback to the user
        Swal.fire('Login Successful', 'You are logged in successfully', 'success');
        this.loader = false;
        if(role == 'Restaurant Admin'){
          this.router.navigate(["/restaurant-admin-landing"]);
        }
        else if(role=='Customer'){
          this.router.navigate(["/customer-landing"]);
        }
      }
    }, (err: any) => {
      Swal.fire('Login Failed', 'Something went wrong', 'error');
      this.loader = false;
    });
  }
}
