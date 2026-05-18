import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CookieBanner } from './cookie-banner';
import { CookieConsentService } from '../servicios/cookie-consent.service';

describe('CookieBanner', () => {
  let component: CookieBanner;
  let fixture: ComponentFixture<CookieBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookieBanner],
      imports: [FormsModule],
      providers: [CookieConsentService],
    }).compileComponents();

    fixture = TestBed.createComponent(CookieBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
