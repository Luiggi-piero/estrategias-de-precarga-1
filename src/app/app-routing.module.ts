import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', // ruta principal
    pathMatch: 'full',
    redirectTo: 'home'  // redirige a la ruta llamada home
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/pages/profile/profile.module').then(m => m.ProfileModule)
  },
  // El apartado de 404 se agrega en el módulo de rutas principal
  // si se agrega en un submodulo de rutas(auth, home o profile) no contiuara analizando los demás submódulos
  {
    path: '**',
    loadChildren: () => import('./modules/pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
