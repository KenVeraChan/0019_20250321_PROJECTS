import { TestBed } from '@angular/core/testing';

import { VariablesCompartidas } from './variablesCompartidas';

describe('VariablesCompartidas', () => {
  let service: VariablesCompartidas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesCompartidas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
