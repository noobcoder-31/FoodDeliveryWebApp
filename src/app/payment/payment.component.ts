import { Component } from '@angular/core';
import { Payment } from 'Models/Payment';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  payment: Payment=new Payment();
amount: number;
  ngOnInit() {
    // this.setCurrentDate();
    this.payment.status = 'Pending';
    this.payment.amount = Number(this.getTotalAmount());
    this.payment.transactionId = this.generateTransactionId();
    this.payment.orderId=Number(sessionStorage.getItem("orderId"));
    this.payment.paymentDate=this.getCurrentDate();
    console.log("fsfs" + this.amount);
  }
  constructor(private service:PaymentService){}
  onSubmit() {
    this.service.createPayment(this.payment).subscribe(data=>{
      if (data.status==200) {
        alert("Payment Completed");
      }
      else{
        alert("Error occurred while processing payment");
      }
    })
  }
  
  getCurrentDate(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // Format for datetime-local input
  }
  // setCurrentDate() {
  //   const today = new Date();
  //   this.payment.paymentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // }
  getTotalAmount() {
    let total = localStorage.getItem("totalAmount");  
    return total;
  }

  generateTransactionId(): string {
    const randomDigits = Math.floor(Math.random() * 900000 + 100000);
    return `TXN${randomDigits}`;
}
}
