import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddresturantComponent } from './resturant-components/addresturant/addresturant.component';
import { AddcategoryComponent } from './category-components/addcategory/addcategory.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MenuitemsListComponent } from './menuItems-components/menuitems-list/menuitems-list.component';
import { RestaurantmanagmentComponent } from './resturant-components/restaurantmanagment/restaurantmanagment.component';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';
import { RestaurantAdminLandingComponent } from './restaurant-admin-landing/restaurant-admin-landing.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { MenuManagmentComponent } from './menu-managment/menu-managment.component';
import { AddMenuitemComponent } from './menuItems-components/add-menuitem/add-menuitem.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { PaymentComponent } from './payment/payment.component';
import { CustomerorderListComponent } from './customerorder-list/customerorder-list.component';
const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch: 'full'},
  {path:'home',component: HomeComponent},
  {path:"register", component:RegisterComponent},
  {path  : "login", component : LoginComponent},
  {path:"newrestaurant",component:AddresturantComponent},
  {path:"newCategory",component:AddcategoryComponent},
  {path:'menuitemslist',component:MenuitemsListComponent},
  {path:'menuitemslist/:restaurant',component:MenuitemsListComponent},
  {path:'restaurantlist',component:RestaurantListComponent},
  {path:'restaurantManagement',component:RestaurantmanagmentComponent},
  { path: 'customer-landing', component: CustomerLandingComponent },
  { path: 'restaurant-admin-landing', component: RestaurantAdminLandingComponent },
  {path:'profile',component: ProfileComponent},
  {path:'aboutus',component:AboutUsComponent },
  {path:'cart',component:CartComponent },
  {path:'menumanagment',component:MenuManagmentComponent},
  {path:'addmenuitem',component:AddMenuitemComponent},
  {path:'orderlist',component:OrderListComponent},
  {path:'customerDetails',component:NewcustomerComponent},
  {path:'payment',component:PaymentComponent},
  {path:'orders',component:CustomerorderListComponent},
  {path  : "**", component : PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
