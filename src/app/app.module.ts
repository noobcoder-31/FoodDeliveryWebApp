import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddresturantComponent } from './resturant-components/addresturant/addresturant.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AddresturantComponent,
    FooterComponent,
    AddcategoryComponent,
    RestaurantListComponent,
    AboutUsComponent,
    MenuitemsListComponent,
    RestaurantmanagmentComponent,
    CustomerLandingComponent,
    RestaurantAdminLandingComponent,
    ProfileComponent,
    CartComponent,
    MenuManagmentComponent,
    AddMenuitemComponent,
    OrderListComponent,
    NewcustomerComponent,
    PaymentComponent,
    CustomerorderListComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot()
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
