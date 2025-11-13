import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cuerpo } from './cuerpo';

describe('Cuerpo', () => {
  let component: Cuerpo;
  let fixture: ComponentFixture<Cuerpo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cuerpo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cuerpo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
