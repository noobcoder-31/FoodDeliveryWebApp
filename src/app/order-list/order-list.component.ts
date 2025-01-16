import { Component } from '@angular/core';
import {
  OrderDetailsViewModel,
} from 'Models/OrderDetailsViewModel';
import { Observable } from 'rxjs';
import { OrderService } from '../Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../Services/restaurant.service';
import { Order } from 'Models/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  orderStatuses: string[] = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
  orders: OrderDetailsViewModel[] = [];
  restId: number;
  
  constructor(
    private orderService: OrderService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    let id: number = Number(localStorage.getItem('userId'));
    this.restaurantService.getByUserid(id).subscribe((data) => {
      this.restId = data[0].restaurantId;
      this.orderService.GetOrdersByRestaurant(this.restId).subscribe((response) => {
        console.log("rsfds"+response)
        this.orders = response;
      });
    });
   
  }

  // Update status method
  updateStatus(id:number,order: OrderDetailsViewModel): void {
    console.log("utkarsh");
    if (order.status === status) {
      return; // No need to update if the status hasn't changed
    }

    let newOrder: Order = {
      orderId: order.orderId,
      restaurantId: order.restaurantId,
      customerId: order.customerId,
      totalAmount: order.totalAmount,
      status: order.status,
      deliveryAddress: order.deliveryAddress,
    };

    this.orderService
      .UpdateOrderStatus(order.orderId, newOrder)
      .subscribe((updatedOrder) => {
        console.log(newOrder);
        alert('Order status updated successfully!');
        this.fetchOrders(); // Reload orders after update
      });
  }

  private fetchOrders(): void {
    this.orderService.GetOrdersByRestaurant(this.restId).subscribe((orders) => {
      this.orders = orders;
    });
  }

  getIcon(status: string): string {
    switch (status) {
      case 'Pending':
        return 'hourglass';
      case 'Confirmed':
        return 'checkmark-circle';
      case 'Preparing':
        return 'construct';
      case 'Ready':
        return 'checkmark';
      case 'Delivered':
        return 'cube';
      case 'Cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  }
}
