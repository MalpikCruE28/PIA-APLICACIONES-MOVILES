import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarritosPageRoutingModule } from './carritos-routing.module';

import { CarritosPage } from './carritos.page';

import {PedidoComponent} from '../component/pedido/pedido.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarritosPageRoutingModule
  ],
  declarations: [CarritosPage, PedidoComponent]
})
export class CarritosPageModule {}
