import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerorderListComponent } from './customerorder-list.component';

describe('CustomerorderListComponent', () => {
  let component: CustomerorderListComponent;
  let fixture: ComponentFixture<CustomerorderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerorderListComponent]
    });
    fixture = TestBed.createComponent(CustomerorderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
