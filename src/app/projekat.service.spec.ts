import { TestBed } from '@angular/core/testing';

import { ProjekatService } from './projekat.service';

describe('ProjekatService', () => {
  let service: ProjekatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjekatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
