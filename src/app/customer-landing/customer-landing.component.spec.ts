import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLandingComponent } from './customer-landing.component';

describe('CustomerLandingComponent', () => {
  let component: CustomerLandingComponent;
  let fixture: ComponentFixture<CustomerLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerLandingComponent]
    });
    fixture = TestBed.createComponent(CustomerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
