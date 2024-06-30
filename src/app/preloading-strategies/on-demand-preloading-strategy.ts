import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, EMPTY, mergeMap } from 'rxjs';
import { PreloadingOptions, PreloadingService } from '../services/preloading.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // para tenerlo disponible
})
export class OnDemandPreloadingStrategy implements PreloadingStrategy {

    // PreloadingOptions: opciones de un sistema de precarga
    private _preloadDemandOptions$: Observable<PreloadingOptions>;

    constructor(private _preloadingService: PreloadingService) {
        // Inicializamos las opciones con el observable del servicio
        this._preloadDemandOptions$ = this._preloadingService.options$
    }

    private decidirSiPrecargar(route: Route, preloadingOptions: PreloadingOptions): boolean {
        // Si:
        // 1. La ruta tiene una propiedad llamada "data" 
        // 2. La ruta tiene dentro de "data" una clave llamada "preload" a true
        // 3. Las opciones tienen una ruta que está incluida en una lista de rutas que queremos precargar
        // 4. Las opciones tienen "preload" a true
        // Aquí podemos agregar más condiciones personalizadas...

        return (
            route.data &&
            route.data["preload"] &&
            [route.path, '*'].includes(preloadingOptions.routePath) &&
            preloadingOptions.preload
        )
    }

    preload(route: Route, load: () => Observable<any>): Observable<any> {

        // Escuchamos los valores de opciones de precarga emitidos por el next() del servicio
        return this._preloadDemandOptions$.pipe(
            // Iteramos por cada valor recibido desde el servicio con el next()
            mergeMap((preloadingOptions: PreloadingOptions) => {
                // Comprobamos si se debe cargar o no bajo estas opciones
                const precargar: boolean = this.decidirSiPrecargar(route, preloadingOptions)
                // Mostramos por consola si se precarga o no el módulo
                console.log(`${precargar ? '' : 'NO'} se precarga el módulo de la ruta ${route.path}`);
                // Devolvemos la ejecución del callback load() o nada
                return precargar ? load() : EMPTY;
            })
        )
        // EMPTY: observable que emite complete
    }
}
