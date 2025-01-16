import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Food_Ordering_System_Frontend';
  ngOnInit() {
  console.log(localStorage.getItem('isLoggedIn'));
  }

}
