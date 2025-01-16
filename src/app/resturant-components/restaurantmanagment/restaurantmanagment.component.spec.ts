import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantmanagmentComponent } from './restaurantmanagment.component';

describe('RestaurantmanagmentComponent', () => {
  let component: RestaurantmanagmentComponent;
  let fixture: ComponentFixture<RestaurantmanagmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantmanagmentComponent]
    });
    fixture = TestBed.createComponent(RestaurantmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
