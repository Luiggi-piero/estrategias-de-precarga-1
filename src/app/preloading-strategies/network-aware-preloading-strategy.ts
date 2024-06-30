import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

export declare var navigator: any;

@Injectable({ providedIn: 'root' })
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {

    /**
     * 
     * @param route La ruta recibida que debería cargar el módulo
     * @param load Callback que carga el módulo
     * @returns Ejecuta el callback de carga del módulo o devuelve un observable vacío
     */
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // Comprueba que el usuario tiene buena conexion
        // 1. En caso que la función devuelva un true -> Carga el módulo
        // 2. En caso que la función devuelva un false -> No devuelve nada
        return this.hasGoodConnection() ? load() : EMPTY;
    }

    /**
     * Función que decide si un módulo se carga o no
     * Comprobando si el usuario tiene una conexión aceptable a internet
     * @returns {boolean} si se puede o no cargar el módulo
     */
    hasGoodConnection(): boolean {
        // Obtenemos la conexón del usuario
        const conn = navigator.connection;

        // En caso de que tengamos la conexión
        if (conn) {
            // Comprobamos si el usuario tiene habilitado la reserva de datos(móvil)
            // En ese caso no cargamos el módulo
            if (conn.saveData) {
                return false; 
            }

            // Lista de conexiones no válidas para precargar un módulo
            const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];

            // Obtenemos el tipo de conexión que tiene el usuario
            const effectiveType = conn.effectiveType || '';

            // Comprobamos si la conexión del usuario está en la lista de conexiones de evitar
            // En caso que sea asi, no precargamos el módulo
            if (avoidTheseConnections.includes(effectiveType)) {
                return false;
            }
        }

        // Si la conexión es buena
        return true;
    }
}