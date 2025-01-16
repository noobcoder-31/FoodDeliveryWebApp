import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from 'Models/Customer';
import { CustomerService } from '../Services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Order } from 'Models/Order';
import { OrderService } from '../Services/order.service';
import { CartService } from '../Services/cart.service';
import { Orderitems } from 'Models/Orderitems';
import { OrderitemsService } from '../Services/orderitems.service';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
})
export class NewcustomerComponent {
    customer: Customer = {
      customerId: 0,
      userId: 0,
      name: '',
      phone: '',
      address: '',
      city: ''
    };
    orderitems:Orderitems={
      orderItemId:0,
      orderId:0,
      menuItemId:0,
      quantity:0,
      unitPrice:0,
      subtotal:0,
      restaurantId:0
    };

    isExistingCustomer: boolean = false;
    isLoading: boolean = true;
    errorMessage: string = '';
    userId: string;
    cartitems:any;
    constructor(
      private customerService: CustomerService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private orderService:OrderService,
      private cartService:CartService ,
      private orderitemService:OrderitemsService // You'll need this to get logged-in user details
    ) { }

    ngOnInit(): void {
      const userId = this.authService.userid.subscribe(userId => {
        this.userId = userId;
        console.log("userid "+userId);
        this.loadCustomerData(Number(userId));
        this.cartitems = this.cartService.getCartItems();
      });
    }

    loadCustomerData(userId: number): void {
      this.customerService.getCustomerByUserid(userId).subscribe({
        next: (data) => {
          if (data) {
            this.customer = data;
            this.isExistingCustomer = true;
          }
          this.customer.userId = userId;
          this.isLoading = false;
        },
        error: (error) => {
          if (error.status === 404) {
            this.isLoading = false;
          } else {
            this.errorMessage = 'Error loading customer data. Please try again.';
            this.isLoading = false;
          }
        }
      });
    }

    onSubmit(form: any): void {
      if (form.valid) {
        this.cartitems = this.cartService.getCartItems();

        if (!this.cartitems || this.cartitems.length === 0) {
          this.errorMessage = 'No items in cart. Please add items before proceeding.';
          return;
        }

        // Handle customer creation/update first
        const customerOperation = this.isExistingCustomer
          ? this.customerService.updateCustomer(this.customer.customerId, this.customer)
          : this.customerService.createCustomer(this.customer);

        customerOperation.subscribe({
          next: (customerResponse) => {
            // Create individual orders for each cart item
            this.createOrdersForItems();
          },
          error: (error) => {
            console.error("Customer operation error:", error);
            this.errorMessage = `Error ${this.isExistingCustomer ? 'updating' : 'creating'} customer details. Please try again.`;
          }
        });
      }
    }

    private createOrdersForItems(): void {
      const orderPromises: Promise<any>[] = [];
      const deliveryAddress = `${this.customer.address}, ${this.customer.city}`;

      // Create separate order for each cart item
      this.cartitems.forEach((item: { price: number; quantity: number; restaurantId: any; menuItemId: any; }) => {
        const itemTotal = item.price * item.quantity;

        const newOrder = {
          restaurantId: item.restaurantId,
          customerId: this.customer.customerId,
          totalAmount: itemTotal,
          status: 'Pending',
          deliveryAddress: deliveryAddress
        };

        const orderPromise = new Promise((resolve, reject) => {
          this.orderService.createOrder(newOrder).subscribe({
            next: (orderResponse) => {
              const orderId = orderResponse.body?.orderId;
              if (!orderId) {
                reject('Order ID not available');
                return;
              }

              // Create order item for this specific order
              const orderItem = {
                menuItemId: item.menuItemId,
                orderId: orderId,
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: itemTotal,
                restaurantId: item.restaurantId
              };

              this.orderitemService.createOrderItem(orderItem).toPromise()
                .then(() => {
                  resolve({
                    orderId,
                    restaurantId: item.restaurantId,
                    menuItemId: item.menuItemId
                  });
                })
                .catch(error => {
                  reject(error);
                });
            },
            error: (error) => {
              reject(error);
            }
          });
        });

        orderPromises.push(orderPromise);
      });

      // Handle all orders
      Promise.all(orderPromises)
        .then(results => {
          // Store all order IDs in session storage
          const orderIds = results.map(result => result.orderId);
          sessionStorage.setItem('orderIds', JSON.stringify(orderIds));

          // Clear cart and navigate to payment
          this.cartService.clearCart();
          this.router.navigate(['/payment']);
        })
        .catch(error => {
          console.error('Error processing orders:', error);
          this.errorMessage = 'Error processing orders. Please try again.';
        });
    }

  }
