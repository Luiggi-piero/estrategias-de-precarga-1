import { Component } from '@angular/core';
import { PreloadingService } from 'src/app/services/preloading.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private _preloadingService: PreloadingService) { }

  cargarModulo(route: string) {
    this._preloadingService.comenzarPrecarga(route);
  }

  cargarTodosLosModulos() {
    this._preloadingService.comenzarPrecarga('*');
  }
}
