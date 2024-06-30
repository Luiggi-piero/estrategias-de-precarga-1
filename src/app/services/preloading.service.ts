import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Creamos una clase de opciones de precarga
// servirá para definir las opciones que debe tener una ruta
// para recargar o no un módulo
export class PreloadingOptions {
  constructor(public routePath: string, public preload: boolean = true) { }
}

/**
 * 
 * 
 * SERVICIO PERSOLANIZADO QUE SE ENCARGARÁ DE PRECARGAR O NO UN MÓDULO
 * DE LAS DIFERENTES RUTAS QUE EXISTAN EN EL MÓDULO DE ENRUTADO (APP-ROUTING.MODULE.TS)
 * Y ESTEN ESPECIFICADAS COMO CARGA PEREZOSA
 * 
 * ✅ LA IDEA ES QUE A TRAVÉS DE UN EVENTO (CLICK, HOVER, LONG PRESS, ETC)
 * SE INICIE LA PRECARGA O NO DE MÓDULOS. POR LO QUE LOGRARÍAMOS ADELANTARNOS
 * AL USUARIO PRECARGANDO UN MÓDULO QUE PREDECIMOS QUE VA A NECESITAR
 * 
 * ✅ CON ESTO SE LOGRARÍA CONSEGUIR UNA MEJOR EXPERIENCIA DE USUARIO, AL EVITAR QUE LA APLICACIÓN
 * SE QUEDE CARGANDO CUANDO TENGA QUE DE MANERA PEREZOSA CARGAR UN MÓDULO DE RUTAS NUEVO.
 * 
 * >> POR EJEMPLO 💡 
 * SI EL USUARIO PASA EL CURSOR POR UN ELEMENTO DEL MENU AL QUE CLARAMENTE
 * VA A NAVEGAR, PRECARGAMOS EL MÓDULO EN SEGUNDO PLANO, PARA QUE LA NAVEGACIÓN SEA MÁS FLUIDA
 * Y REDUCIR LOS TIEMPOS DE CARGA
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  // Un Subject es un tipo de observable que permite emitir valores
  // a quien esté suscrito al mismo a través del método .next(valor)
  private _subject = new Subject<PreloadingOptions>();

  // Cualquier Subject puede ser tratddo como un observable y es el
  // que tenemos que hacer público.
  // Con él vamos a ofrecer las opciones de la ruta que desea ser precargada como un Observable.
  public options$ = this._subject.asObservable();

  /**
   * Método que evalúa la precarga
   * @param routePath Ruta que se desea precargar
   */
  comenzarPrecarga(routePath: string){
    
    // Creamos unas opciones de precarga
    const opcionesPrecarga = new PreloadingOptions(routePath, true);

    // Emitimos las opciones que desean ser precargadas
    // Esta información la escuchará la ESTRATEGIA DE PRECARGA
    // * ON-DEMAND-PRELOADING-STRATEGY
    // Para evaluar si debe o no debe precargar la ruta
    this._subject.next(opcionesPrecarga);
  }
}
