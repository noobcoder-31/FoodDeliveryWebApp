import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'Models/Restaurant';
import { AddrestaurantService } from 'src/app/Services/addrestaurant.service';
import { ImageUploadService } from 'src/app/Services/image-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addresturant',
  templateUrl: './addresturant.component.html',
  styleUrls: ['./addresturant.component.css']
})
export class AddresturantComponent {
  restaurant:Restaurant;
  loading:boolean = false;
  image:string='';
  states: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep',
    'Delhi', 'Puducherry'
];

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
  onSubmit(form:any){
    this.loading=true;
    let addregister=form.value;
    let id=Number(localStorage.getItem('userId'));
    addregister.UserId=id;
    addregister.image=this.image;
    this.service.AddRestaurant(addregister).subscribe((res:any)=>{
      this.loading=false;
      if (res.status=200) {
        console.log("new Resturant",addregister.name);
        Swal.fire('New Restaurant Added','','success');
        this.router.navigate(["/restaurantManagement"])
      }
    },(err:any)=>{
      Swal.fire('Error','Unable to add restaurant','error');
    })

  }
  constructor(private service:AddrestaurantService,private router:Router, private imageUploadService:ImageUploadService){}
}
