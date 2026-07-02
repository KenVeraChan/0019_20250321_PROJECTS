import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S4dControlVentasInterfaz } from './s4d-control-ventas-interfaz';

describe('S4dControlVentasInterfaz', () => {
  let component: S4dControlVentasInterfaz;
  let fixture: ComponentFixture<S4dControlVentasInterfaz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [S4dControlVentasInterfaz],
    }).compileComponents();

    fixture = TestBed.createComponent(S4dControlVentasInterfaz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
