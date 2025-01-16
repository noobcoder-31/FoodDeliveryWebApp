import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemsListComponent } from './menuitems-list.component';

describe('MenuitemsListComponent', () => {
  let component: MenuitemsListComponent;
  let fixture: ComponentFixture<MenuitemsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuitemsListComponent]
    });
    fixture = TestBed.createComponent(MenuitemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
