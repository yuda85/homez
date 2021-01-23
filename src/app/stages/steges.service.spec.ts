import { TestBed } from '@angular/core/testing';

import { StagesService } from './steges.service';

describe('StegesService', () => {
  let service: StagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
