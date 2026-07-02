import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { VariablesCompartidas } from '../services/variablesCompartidas';

@Component({
  selector: 'app-cuerpo',
  standalone: false,
  templateUrl: './cuerpo.html',
  styleUrls: ['./cuerpo.css'],
})
export class Cuerpo implements OnInit, OnDestroy {
  public seleccion: number = 0;
  private sub?: Subscription;

  constructor(private variables: VariablesCompartidas) {}

  ngOnInit(): void {
    this.sub = this.variables.getEleccion$().subscribe((v) => {
      this.seleccion = v;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
