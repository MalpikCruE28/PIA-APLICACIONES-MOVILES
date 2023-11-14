import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AutGuardGuard} from '../app/auth//guards/aut-guard.guard'

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./auth/main/main.module').then(m => m.MainPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./protected-app/tabs/tabs.module').then( m => m.TabsPageModule),
    
  },
  {
    path: 'detalle-negocio/:negocioId',
    loadChildren: () => import('./protected-app/detalle-negocio/detalle-negocio.module').then( m => m.DetalleNegocioPageModule),
    canActivate: [AutGuardGuard],
    canLoad: [AutGuardGuard]
  },

  {
    path: 'carritos/:usuarioId',
    loadChildren: () => import('./protected-app/carritos/carritos.module').then( m => m.CarritosPageModule),
    canActivate: [AutGuardGuard],
    canLoad: [AutGuardGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./protected-app/pedidos/pedidos.module').then( m => m.PedidosPageModule),
    canActivate: [AutGuardGuard],
    canLoad: [AutGuardGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./protected-app/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [AutGuardGuard],
    canLoad: [AutGuardGuard]
  },
  {
    path: 'detalles-perfil/:usuarioId',
    loadChildren: () => import('./protected-app/detalles-perfil/detalles-perfil.module').then( m => m.DetallesPerfilPageModule),
    canActivate: [AutGuardGuard],
    canLoad: [AutGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
