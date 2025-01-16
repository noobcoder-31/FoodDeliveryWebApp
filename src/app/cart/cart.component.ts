import { Component, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  cartItems: any[] = [];
  totalPrice: number = 0;
  shippingCost: number = 5.00;  // Static shipping cost in INR
  discountCode: string = '';    // Discount code (if any)
  
  constructor(private cartService: CartService,private router: Router) {}
  
  ngOnInit(): void {
    // Get cart items from the service
    this.cartItems = this.cartService.getCartItems();
    console.log(this.cartItems); 
    this.calculateTotalPrice();
  }
  
  // Update the total price after changes
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  // Get the total price including shipping
  get totalPriceWithShipping(): number {
    let totalAmount=this.totalPrice + this.shippingCost;
    localStorage.setItem("totalAmount",totalAmount.toString());
    return totalAmount;
  }
  
  // Increment item quantity
  incrementQuantity(index: number): void {
    const item = this.cartItems[index];
    item.quantity++;
    this.cartService.updateCartItem(item); // Update the cart in service
    this.calculateTotalPrice();  // Recalculate total price
  }
  
  // Decrement item quantity
  decrementQuantity(index: number): void {
    const item = this.cartItems[index];
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateCartItem(item); // Update the cart in service
      this.calculateTotalPrice();  // Recalculate total price
    }
  }
  
  // Remove item from cart
  removeItem(index: number): void {
    const item = this.cartItems[index];
    this.cartService.removeFromCart(item);  // Remove the item from service
    this.cartItems.splice(index, 1);  // Remove item from the local array
    this.calculateTotalPrice();  // Recalculate total price
  }
  
  addItemToCart(item: any): void {
    this.cartService.addToCart(item);
    this.cartItems = this.cartService.getCartItems();
    // Update cart items after adding
    this.calculateTotalPrice(); // Recalculate total price after adding item
  }

  
  tocustomerDetails() {
    this.router.navigate(['/customerDetails']);
  }
     

  
}
