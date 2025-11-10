import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroBase } from './cuadro-base';

describe('CuadroBase', () => {
  let component: CuadroBase;
  let fixture: ComponentFixture<CuadroBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuadroBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuadroBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
