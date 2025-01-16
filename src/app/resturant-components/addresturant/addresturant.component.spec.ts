import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresturantComponent } from './addresturant.component';

describe('AddresturantComponent', () => {
  let component: AddresturantComponent;
  let fixture: ComponentFixture<AddresturantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddresturantComponent]
    });
    fixture = TestBed.createComponent(AddresturantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
