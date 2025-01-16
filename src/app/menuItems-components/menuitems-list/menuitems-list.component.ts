import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'Models/Category';
import { MenuItems } from 'Models/MenuItems';
import { MenuItemsViewModel } from 'Models/MenuItemsViewModel';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryService } from 'src/app/Services/category.service';
import { MenuItemsService } from 'src/app/Services/menu-items.service';

@Component({
  selector: 'app-menuitems-list',
  templateUrl: './menuitems-list.component.html',
  styleUrls: ['./menuitems-list.component.css']
})
export class MenuitemsListComponent implements OnInit {
  restaurant: string | null = null;

  menuItems: MenuItemsViewModel[] = [];
  filteredMenuItems: MenuItemsViewModel[] = [];
  categories: Category[] = [];
  selectedCategory: string = '';
  loading: boolean = true;

  constructor(
    private menuItemsService: MenuItemsService,
    private cartService: CartService,
    private categoryService: CategoryService,   private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurant = params['restaurant'] || null;
      this.loadMenuItems();
      console.log(this.restaurant);
    });
  }

  loadMenuItems(): void {
    this.loading = true;
    this.menuItemsService.GetMenuItems().subscribe(
      (data: MenuItemsViewModel[]) => {
        this.menuItems = data;
        console.log(this.menuItems);
        this.applyFilters();

        this.categoryService.getAllCategory().subscribe(data => {
          this.categories = data;
          this.loading = false;
        });
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  getImageUrl(imageUrl: string): string {
    return imageUrl && imageUrl.length >= 6 ? imageUrl : 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-572949-1640772.jpg&fm=jpg';
  }

  filterMenuItems(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    // Start with all menu items
    let filtered = [...this.menuItems];

    // Apply restaurant filter if restaurantId is provided
    if (this.restaurant) {
      filtered = filtered.filter(item => item.restaurant === this.restaurant);
    }

    // Apply category filter if selected
    if (this.selectedCategory) {
      filtered = filtered.filter(item => item.category === this.selectedCategory);
    }

    this.filteredMenuItems = filtered;
  }

  addToCart(item: MenuItemsViewModel): void {
    this.cartService.addToCart(item);
    localStorage.setItem("restaurantId",item.restaurantId.toString());
    alert(`${item.name} has been added to the cart!`);
  }
}
