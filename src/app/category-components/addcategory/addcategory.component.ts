import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'Models/Category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {
  category:Category;

  constructor(private service: CategoryService,private  route: Router){}
OnSubmit(form:any) {
  let newCat=form.value;
  this.service.AddCategory(newCat).subscribe((res:any)=>{
    if (res.status==200) {
      alert('New Category added');
      this.route.navigate(['/home'])
    }
    else if(res.status==400){
      alert("Category Exists");
    }
  },(err:any)=>{
    alert("There was a problem in adding new Category")
  })
  if(form.valid){
    console.log(this.category);
  }
}

}
