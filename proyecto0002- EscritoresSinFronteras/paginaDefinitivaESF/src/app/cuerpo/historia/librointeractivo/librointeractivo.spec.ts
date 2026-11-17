import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Librointeractivo } from './librointeractivo';

describe('Librointeractivo', () => {
  let component: Librointeractivo;
  let fixture: ComponentFixture<Librointeractivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Librointeractivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Librointeractivo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
