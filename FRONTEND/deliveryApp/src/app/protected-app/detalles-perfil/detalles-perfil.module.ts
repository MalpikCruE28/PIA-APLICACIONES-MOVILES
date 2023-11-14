import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPerfilPageRoutingModule } from './detalles-perfil-routing.module';

import { DetallesPerfilPage } from './detalles-perfil.page';

import { ReactiveFormsModule } from '@angular/forms';

import { PwdChangeModalComponent} from '../component/pwd-change-modal/pwd-change-modal.component'
import { EmailChangeModalComponent} from '../component/email-change-modal/email-change-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPerfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetallesPerfilPage, PwdChangeModalComponent, EmailChangeModalComponent]
})
export class DetallesPerfilPageModule {}
