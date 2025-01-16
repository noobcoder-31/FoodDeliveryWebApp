import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'Models/Restaurant';
import { RestaurantByUserIdViewModel } from 'Models/RestaurantByUserIdViewModel';
import { RestaurantViewModel } from 'Models/RestaurantViewModel';
import { AddrestaurantService } from 'src/app/Services/addrestaurant.service';
import { RestaurantService } from 'src/app/Services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurantmanagment',
  templateUrl: './restaurantmanagment.component.html',
  styleUrls: ['./restaurantmanagment.component.css']
})
export class RestaurantmanagmentComponent implements OnInit {
  restaurants: RestaurantByUserIdViewModel|null=null;
  newRestaurant: RestaurantViewModel = new RestaurantViewModel();
  editingRestaurant: RestaurantByUserIdViewModel | null = null;

  constructor(private restaurantService: RestaurantService, private addrestaurant: AddrestaurantService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (!userId || isNaN(Number(userId))) {
      Swal.fire('Please Login first', 'Login', 'error');
      return;
    }
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.restaurantService.getByUserid(userId).subscribe(
      data => {
        if(data.length!==0)
        this.restaurants = data[0];
        else
        this.restaurants=null;
        console.log(this.restaurants);
      },
      error => {
        Swal.fire('Error', 'Could not load restaurants', 'error');
      }
    );
  }

  addRestaurant(): void {
    this.addrestaurant.AddRestaurant(this.newRestaurant).subscribe(
      () => {
        this.loadRestaurants();
        this.newRestaurant = new RestaurantViewModel();
      },
      error => {
        Swal.fire('Error', 'Could not add restaurant', 'error');
      }
    );
  }

  editRestaurant(restaurant: RestaurantByUserIdViewModel): void {
    this.editingRestaurant = { ...restaurant };
    console.log(this.editingRestaurant?.image);
  }

  saveEdit(id: number): void {
    if (this.editingRestaurant) {
      const rest: Restaurant = {
        restaurantId: this.editingRestaurant.restaurantId,
        name: this.editingRestaurant.name,
        description: this.editingRestaurant.description,
        address: this.editingRestaurant.address,
        city: this.editingRestaurant.city,
        state: this.editingRestaurant.state,
        phone: this.editingRestaurant.phone,
        email: this.editingRestaurant.email,
        image: this.editingRestaurant.image,
        userId:this.editingRestaurant.userId
      };
      this.restaurantService.updaterestaurantDetails(id, rest).subscribe(
        () => {
          this.loadRestaurants();
          console.log(this.editingRestaurant?.image);
          this.editingRestaurant = null;
          Swal.fire('Updated', 'Restaurant data updated', 'success');
        },
        error => {
          console.log(error);
          Swal.fire('Error', 'Could not save restaurant changes', 'error');
        }
      );
    }
  }

  cancelEdit(): void {
    this.editingRestaurant = null;
  }

  deleteRestaurant(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.restaurantService.deleteRestaurant(id).subscribe(
          () => {
            this.loadRestaurants();
            Swal.fire('Deleted!', 'Your restaurant has been deleted.', 'success');
          },
          error => {
            Swal.fire('Error', 'Could not delete restaurant', 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'Your restaurant is safe :)', 'info');
      }
    });
  }


  onHoverButton(action: string, restaurantId: number): void {
    const buttonElement = document.querySelector(`#${action}-button-${restaurantId}`);
    if (buttonElement) {
      buttonElement.classList.add('active');
    }
  }

  onLeaveButton(action: string, restaurantId: number): void {
    const buttonElement = document.querySelector(`#${action}-button-${restaurantId}`);
    if (buttonElement) {
      buttonElement.classList.remove('active');
    }
  }
}
