import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Piecera } from './piecera';

describe('Piecera', () => {
  let component: Piecera;
  let fixture: ComponentFixture<Piecera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Piecera]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Piecera);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
