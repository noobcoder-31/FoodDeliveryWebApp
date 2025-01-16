import { DecimalPipe } from "@angular/common";

export interface MenuItems{
    menuItemId? : number;
    categoryId : number;
    name : string;
    description : string;
    price : number;
    imageUrl  :string;
    restaurantId : number;
}
