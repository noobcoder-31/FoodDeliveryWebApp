import { Injectable } from '@angular/core';

interface CartItem {
  Name: string;
  Price: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey: string = 'cartItems';
  addToCart(item: any): void {
    let currentItems = this.getCartItems();


    const existingItemIndex = currentItems.findIndex(cartItem => cartItem.menuItemId === item.menuItemId);

    if (existingItemIndex !== -1) {

      currentItems[existingItemIndex].quantity += 1;
    } else {

      item.quantity = 1;
      currentItems.push(item);
    }

    this.updateCartItems(currentItems);
  }


  updateCartItem(updatedItem: any): void {
    let currentItems = this.getCartItems();
    const itemIndex = currentItems.findIndex(cartItem => cartItem.menuItemId === updatedItem.menuItemId);

    if (itemIndex !== -1) {
      currentItems[itemIndex] = updatedItem;
      this.updateCartItems(currentItems);
    }
  }

  removeFromCart(item: any): void {
    let currentItems = this.getCartItems();
    currentItems = currentItems.filter(cartItem => cartItem.menuItemId !== item.menuItemId);
    this.updateCartItems(currentItems);
  }

  private updateCartItems(items: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }

  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.cartKey);
    return cartItems ? JSON.parse(cartItems) : [];
  }



}
