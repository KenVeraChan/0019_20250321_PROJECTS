import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CookieConsentService } from '../servicios/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: false,
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.css',
})
export class CookieBanner implements OnInit, OnDestroy {
  public visible = false;
  public mostrarPreferencias = false;

  public analytics = false;
  public marketing = false;

  private sub?: Subscription;

  constructor(private readonly cookieConsent: CookieConsentService) {}

  ngOnInit(): void {
    this.cookieConsent.init();
    this.sub = this.cookieConsent.mostrarBanner$.subscribe(mostrar => {
      this.visible = mostrar;
      if (mostrar) {
        this.analytics = this.cookieConsent.analyticsDraft;
        this.marketing = this.cookieConsent.marketingDraft;
        const guardadas = this.cookieConsent.obtenerPreferencias();
        if (guardadas) {
          this.analytics = guardadas.analytics;
          this.marketing = guardadas.marketing;
        }
      } else {
        this.mostrarPreferencias = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public aceptarTodas(): void {
    this.cookieConsent.aceptarTodas();
  }

  public rechazarNoEsenciales(): void {
    this.cookieConsent.rechazarNoEsenciales();
  }

  public abrirPreferencias(): void {
    this.mostrarPreferencias = true;
    const guardadas = this.cookieConsent.obtenerPreferencias();
    if (guardadas) {
      this.analytics = guardadas.analytics;
      this.marketing = guardadas.marketing;
    }
  }

  public cerrarPreferencias(): void {
    this.mostrarPreferencias = false;
  }

  public guardarSeleccion(): void {
    this.cookieConsent.guardarPreferencias(this.analytics, this.marketing);
  }
}
