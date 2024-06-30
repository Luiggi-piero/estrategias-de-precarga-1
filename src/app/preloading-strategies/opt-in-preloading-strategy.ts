// cada archivo dentro de la carpeta preloading-strategies es una estrategia
// escribe "opt-in-strategy" + ctrl + space   para generar la estructura base que genera la estrategia

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OptInPreloadingStrategy implements PreloadingStrategy {

    /**
     * 
     * @param route La ruta recibida que debería cargar el módulo
     * @param load Callback que carga el módulo
     * @returns Ejecuta el callback de carga del módulo o devuelve un observable vacío
     */
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Evaluación que determina:
        // 1. Si dentro de la ruta hay un valor llamado "data"
        // 2. Si dentro del valor "data" hay una clave llamada "preload" a "true"
        // Entonces, ejecuta el callback y carga el módulo
        // Si no lo tiene, devuelve un observable nulo( of(null) o también puede ser un EMPTY) para que no se precargue el módulo
        return route.data && route.data['preload'] ? load() : EMPTY;
    }
}
