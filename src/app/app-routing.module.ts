import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OptInPreloadingStrategy } from './preloading-strategies/opt-in-preloading-strategy';
import { NetworkAwarePreloadStrategy } from './preloading-strategies/network-aware-preloading-strategy';
import { OnDemandPreloadingStrategy } from './preloading-strategies/on-demand-preloading-strategy';

const routes: Routes = [
  {
    path: '', // ruta principal
    pathMatch: 'full',
    redirectTo: 'home'  // redirige a la ruta llamada home
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/pages/auth/auth.module').then(m => m.AuthModule),
    data: {
      preload: true // este módulo se va a precargar bajo la estrategia de precarga OptIn / OnDemand
    }
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule),
    data: {
      preload: true // este módulo se va a precargar bajo la estrategia de precarga OptIn / OnDemand
    }
  },
  // El apartado de 404 se agrega en el módulo de rutas principal
  // si se agrega en un submodulo de rutas(auth, home o profile) no contiuara analizando los demás submódulos
  {
    path: '**',
    loadChildren: () => import('./modules/pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      // 💡 1 - Precargar todos los módulos de las rutas
      // preloadingStrategy: PreloadAllModules
      // 💡 2 - NO precargar ningún módulo -> forzar carga perezosa
      // preloadingStrategy: NoPreloading
      // 💡 3 - Estrategia personalizada: Precarga por opciones en rutas
      // preloadingStrategy: OptInPreloadingStrategy
      // 💡 4 - Estrategia personalizada: Precarga por conexión
      // preloadingStrategy: NetworkAwarePreloadStrategy
      // 💡 5 - Estrategia personalizada: Precarga por demanda iniciada por evento controlado desde servicio PreloadingService
      preloadingStrategy: OnDemandPreloadingStrategy
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
