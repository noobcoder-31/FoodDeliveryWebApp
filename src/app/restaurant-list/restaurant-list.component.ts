import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../Services/restaurant.service';
import { Restaurant } from 'Models/Restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  loader: boolean = true;
  searchQuery: string = '';

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.fetchRestaurants();
  }

  getRestaurantImage(imageUrl: string): string {
    return imageUrl && imageUrl.length >= 6 && imageUrl.indexOf('example')==-1 ? imageUrl : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D';
  }

  fetchRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        this.filteredRestaurants = data;
        this.loader = false;
      },
      (error) => {
        console.error('Error fetching restaurant data', error);
        this.loader = false;
      }
    );
  }

  onSearch(): void {
    if (this.searchQuery) {

      this.filteredRestaurants = this.restaurants.filter(restaurant =>
        restaurant.city.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        restaurant.state.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredRestaurants = this.restaurants;
    }
  }
}
