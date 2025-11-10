import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cabeceras } from './cabeceras';

describe('Cabeceras', () => {
  let component: Cabeceras;
  let fixture: ComponentFixture<Cabeceras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cabeceras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cabeceras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
