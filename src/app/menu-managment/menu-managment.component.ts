import { Component } from '@angular/core';
import { MenuItemsViewModel } from 'Models/MenuItemsViewModel';
import { MenuItemsService } from '../Services/menu-items.service';
import Swal from 'sweetalert2';
import { MenuItems } from 'Models/MenuItems';
import { RestaurantService } from '../Services/restaurant.service';
import { RestaurantByUserIdViewModel } from 'Models/RestaurantByUserIdViewModel';
import { switchMap } from 'rxjs';
import {Category} from "../../../Models/Category";
import { CategoryService } from '../Services/category.service';

@Component({
  selector: 'app-menu-managment',
  templateUrl: './menu-managment.component.html',
  styleUrls: ['./menu-managment.component.css']
})
export class MenuManagmentComponent {
  menuItems: MenuItemsViewModel[] = [];
  allCategories:Category[]=[];
  restId:number;
  isRestaurant:boolean=false;

  editingItem: MenuItemsViewModel | null = null;
  constructor(private categoryService:CategoryService,private menuItemsService: MenuItemsService,private restaurantService:RestaurantService){}

  ngOnInit(){
    const id = Number(localStorage.getItem('userId'));
    this.categoryService.getAllCategory().subscribe(data=>{
      this.allCategories = data;
      console.log(this.allCategories);
    })
    this.restaurantService.getByUserid(id).pipe(
      switchMap(data => {
        if(data.length!==0)
          this.isRestaurant=true;
        this.restId = data[0].restaurantId;
        return this.menuItemsService.GetMenuItemsByRestaurant(this.restId);
      })
    ).subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }


  editMenuItem(menuItem: MenuItemsViewModel) {
    this.editingItem = { ...menuItem };
  }

  saveEdit(menuItemId: number) {
    if (this.editingItem === null) {
      return;
    }

    if (!this.editingItem.name || !this.editingItem.price) {
      Swal.fire('Error', 'Name and Price are required!', 'error');
      return;
    }

    let updatedMenuItem: MenuItems = {
      menuItemId: this.editingItem.menuItemId || 0,
      categoryId: Number(this.editingItem.category),
      name: this.editingItem.name,
      description: this.editingItem.description || '',
      price: this.editingItem.price,
      imageUrl: this.editingItem.imageUrl || '',
      restaurantId: this.restId,
    };

    console.log(updatedMenuItem);

    this.menuItemsService.UpdateMenuItems(menuItemId, updatedMenuItem).subscribe({
      next: () => {
        Swal.fire('Success', 'Menu item updated!', 'success');
        console.log(updatedMenuItem);
        this.editingItem = null;

        setTimeout(() => {
          location.reload();
        }, 2000);
      },
      error: (err) => {
        console.error('Error updating menu item:', err);
        Swal.fire('Error', 'Failed to update menu item.', 'error');
      }
    });
  }


  cancelEdit() {
    this.editingItem = null;
  }

  deleteMenuItem(menuItemId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuItemsService.DeleteMenuItems(menuItemId).subscribe({
          next: () => {
            Swal.fire('Deleted', 'Menu item deleted!', 'success');
            location.reload();
          },
          error: (err) => {
            console.log(err);
            Swal.fire('Error', 'Failed to delete menu item.', 'error');
          }
        });
      }
    });
  }

}
