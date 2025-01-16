import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuitemComponent } from './add-menuitem.component';

describe('AddMenuitemComponent', () => {
  let component: AddMenuitemComponent;
  let fixture: ComponentFixture<AddMenuitemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMenuitemComponent]
    });
    fixture = TestBed.createComponent(AddMenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
