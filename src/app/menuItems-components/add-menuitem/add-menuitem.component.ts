import { Component } from '@angular/core';
import { MenuItems } from 'Models/MenuItems';
import Swal from 'sweetalert2';
import { MenuItemsService } from '../../Services/menu-items.service';
import { Router } from '@angular/router';
import { Category } from 'Models/Category';
import { CategoryService } from 'src/app/Services/category.service';
import { RestaurantService } from 'src/app/Services/restaurant.service';
import { MenuItemsViewModel } from "../../../../Models/MenuItemsViewModel";
import { ImageUploadService } from 'src/app/Services/image-upload.service';

@Component({
  selector: 'app-add-menuitem',
  templateUrl: './add-menuitem.component.html',
  styleUrls: ['./add-menuitem.component.css']
})
export class AddMenuitemComponent {
  loading:boolean;
  image:string='';
  menuItems: MenuItemsViewModel = {
    menuItemId: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: '',
    restaurant: '',
    restaurantId: 0
  };
  allCategories: Category[] = [];
  restId: number;

  constructor(
    private service: MenuItemsService,
    private router: Router,
    private categoryService: CategoryService,
    private restaurantService: RestaurantService,
    private imageUploadService:ImageUploadService
  ) {}

  ngOnInit() {
    const id = Number(localStorage.getItem('userId'));
    console.log(id);

    this.categoryService.getAllCategory().subscribe(data => {
      this.allCategories = data;
      console.log(this.allCategories);
    });


    this.restaurantService.getByUserid(id).subscribe(data => {
      this.restId = data[0].restaurantId;
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadImage(file);
    }
  }
  uploadImage(file: File): void {

    this.imageUploadService.uploadImage(file).subscribe(
      (response) => {
        this.image = response.secure_url;
        console.log('Profile Picture Uploaded:', this.image);
      },
      (error) => {
        console.error('Error uploading image:', error);
      }
    );
  }

  onSubmit(form: any) {
    let data = form.value;
    this.loading=true;
    console.log(this.image);
    let addmenuItems: MenuItems = {
      categoryId: Number(data.category),
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: this.image,
      restaurantId: this.restId
    };
    this.service.AddMenuItems(addmenuItems).subscribe(
      (res: any) => {
        this.loading=false;
        if (res.status === 200) {
          console.log("New MenuItems Added", addmenuItems);
          Swal.fire({
            title: 'Success!',
            text: 'New menu item has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(["/menumanagment"]);
          });
        }
      },
      (err: any) => {
        console.log(err);

        Swal.fire({
          title: 'Error!',
          text: 'There was a problem adding the new menu item.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }
}
