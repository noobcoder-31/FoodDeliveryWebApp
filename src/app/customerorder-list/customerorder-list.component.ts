import { Component } from '@angular/core';
import { Orderitems } from 'Models/Orderitems';
import { OrdersByUserId } from 'Models/OrdersbyUserId';
import { OrderService } from '../Services/order.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customerorder-list',
  templateUrl: './customerorder-list.component.html',
  styleUrls: ['./customerorder-list.component.css']
})
export class CustomerorderListComponent {
  orders: OrdersByUserId[] = [];
  isLoading = false;
  private subscription: Subscription;
  
  constructor(private service: OrderService) {}

  ngOnInit() {
    const userId = Number(localStorage.getItem("userId"));
    if (userId) {
      this.isLoading = true;
      this.subscription = this.service.getOrdersByUserId(userId).subscribe({
        next: (response) => {
          this.orders = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
          this.isLoading = false;
        }
      });
    } else {
      console.error('No userId found in localStorage');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
