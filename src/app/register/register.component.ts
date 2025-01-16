import { Component } from '@angular/core';
import { AbstractControlDirective, NgForm } from '@angular/forms';
import { User } from 'Models/User';
import { RegisterService } from '../Services/register.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ImageUploadService } from '../Services/image-upload.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
user: User;
isRegistered:string='true';
Role:string=''
loader:boolean=false;
profilePictureUrl: string = '';

constructor(private service:RegisterService,private router:Router,private imageUploadService:ImageUploadService){}

// getting file uploaded by user
onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.uploadImage(file);
  }
}

uploadImage(file: File): void {
  this.loader = true;

  this.imageUploadService.uploadImage(file).subscribe(
    (response) => {
      this.loader = false;
      this.profilePictureUrl = response.secure_url;
      console.log('Profile Picture Uploaded:', this.profilePictureUrl);
    },
    (error) => {
      this.loader = false;
      console.error('Error uploading image:', error);
    }
  );
}

OnSubmit(form:any) {
  if (form.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill out all required fields!',
    });
    return;
  }
  let registeruser=form.value;
  registeruser.profilepicture=this.profilePictureUrl;
  this.loader=true;
  this.service.Register(registeruser).subscribe((res:any)=>{
    if(res.status==200){
      localStorage.setItem('registered',this.isRegistered)
      sessionStorage.setItem('registerToken',res.body.token)
      const token=sessionStorage.getItem('registerToken')
      console.log("token :"+token)
      Swal.fire('Registration SuccessFull', 'you are registered in successfully','success');
      this.loader=false;
      this.router.navigate(["/home"])
    }
  },(err:any)=>{
    Swal.fire('Registeration Failed', 'Failed to register, try again!!','error');
    this.loader=false;
  })
  if (form.valid) {
    console.log(this.user);
  }
}

}
