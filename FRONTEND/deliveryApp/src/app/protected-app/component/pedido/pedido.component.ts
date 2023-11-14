import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PedidoRequest } from 'src/app/protected-app/interface/pedido-request';
import {PedidoService} from 'src/app/protected-app/service/pedido.service'

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent  implements OnInit {

  usuarioId: any;
  negocioId: any;
  carritoId: any;
  totalCarrito: any;
  nombreNegocio: any;

  direccionEntrega: any;
  metodoPago: any;
  
  pedido: PedidoRequest = { userId: 0, businessId: 0, carritoId: 0, 
    direccionEntrega: '', metodopagoId: 0, total: 0, status: ''}

  constructor(
    private pedidoService: PedidoService,
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}



  realizarPedido() {

    this.pedido = {carritoId: this.carritoId, 
      businessId: this.negocioId, userId: this.usuarioId, 
      direccionEntrega: this.direccionEntrega, 
      metodopagoId: this.metodoPago, total: this.totalCarrito, status: ""
    }
    
    this.pedidoService.crearPedido(this.pedido).subscribe(
      (response) => {
        this.close();
      },
      (error) => {
        console.error('Error al hacer el pedido', error);
      }
    );
  }

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
