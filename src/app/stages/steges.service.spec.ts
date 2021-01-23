import { TestBed } from '@angular/core/testing';

import { StegesService } from './steges.service';

describe('StegesService', () => {
  let service: StegesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StegesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
