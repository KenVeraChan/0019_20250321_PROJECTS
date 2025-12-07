import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaError } from './paginaerror';

describe('PaginaError', () => {
  let component: PaginaError;
  let fixture: ComponentFixture<PaginaError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginaError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
