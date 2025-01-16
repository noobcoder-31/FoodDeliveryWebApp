import { TestBed } from '@angular/core/testing';

import { AddrestaurantService } from './addrestaurant.service';

describe('AddrestaurantService', () => {
  let service: AddrestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddrestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
