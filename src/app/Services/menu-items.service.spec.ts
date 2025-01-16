import { TestBed } from '@angular/core/testing';

import { AddmenuItemsService } from './menu-items.service';

describe('AddmenuItemsService', () => {
  let service: AddmenuItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddmenuItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
