import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPerfilPage } from './detalles-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPerfilPageRoutingModule {}
