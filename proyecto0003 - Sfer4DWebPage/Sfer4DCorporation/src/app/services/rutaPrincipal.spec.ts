import { TestBed } from '@angular/core/testing';

import { RutaPrincipal } from './rutaPrincipal';

describe('RutaPrincipal', () => {
  let service: RutaPrincipal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaPrincipal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
