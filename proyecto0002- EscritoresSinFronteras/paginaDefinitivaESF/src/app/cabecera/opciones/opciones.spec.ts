import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Opciones } from './opciones';

describe('Opciones', () => {
  let component: Opciones;
  let fixture: ComponentFixture<Opciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Opciones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Opciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
