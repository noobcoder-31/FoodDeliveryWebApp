import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAdminLandingComponent } from './restaurant-admin-landing.component';

describe('RestaurantAdminLandingComponent', () => {
  let component: RestaurantAdminLandingComponent;
  let fixture: ComponentFixture<RestaurantAdminLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantAdminLandingComponent]
    });
    fixture = TestBed.createComponent(RestaurantAdminLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
