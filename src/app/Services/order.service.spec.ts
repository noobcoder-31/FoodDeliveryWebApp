import { TestBed } from '@angular/core/testing';

import { OrderitemsService } from './order.service';

describe('OrderitemsService', () => {
  let service: OrderitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
