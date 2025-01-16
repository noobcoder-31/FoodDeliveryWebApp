export class Order{
    orderId?:number;
    restaurantId:number;
    customerId:number;
    dateTime?:string;
    totalAmount:number;
    status:string;
    deliveryAddress:string;
}
