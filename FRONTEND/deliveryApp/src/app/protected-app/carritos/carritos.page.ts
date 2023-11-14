import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../service/carrito.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {PedidoComponent} from '../component/pedido/pedido.component'

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.page.html',
  styleUrls: ['./carritos.page.scss'],
})
export class CarritosPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  carritos: any[] = [];
  respuesta: any;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    this.obtenerCarritos();
  }

  obtenerCarritos() {
    this.carritoService.getCarritosOfUsuario(this.usuarioId).subscribe(
      (response: any) => {
        this.carritos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de carritos:', error);
      }
    );
  }

  eliminarCarrito(carritoId: number){

    this.carritoService.deleteCarrito(carritoId).subscribe(
      (response: any) => {
        this.respuesta = response;
        this.obtenerCarritos();
      },
      (error) => {
        console.error('Error al eliminar el carrito', error)
      }
    );
  }

  editarCarrito(carritoId: number){

    this.carritoService.deleteCarrito(carritoId).subscribe(
      (response: any) => {
        this.respuesta = response;
        this.obtenerCarritos();
      },
      (error) => {
        console.error('Error al eliminar el carrito', error)
      }
    );
  }

  hacerPedido(negocioId: number, carritoId: number, total: any, nombreNegocio: string){
    
    this.openPedidoModal(negocioId, carritoId, total, nombreNegocio);
  }

  async openPedidoModal(negocioId: number, carritoId: number, total: any, nombreNegocio: string){
    const modal = await this.modalCtrl.create({
      component: PedidoComponent,
      componentProps:{
        usuarioId: this.usuarioId,
        negocioId: negocioId,
        totalCarrito: total,
        carritoId: carritoId,
        nombreNegocio: nombreNegocio
      }
    });
    console.error(carritoId);

    return await modal.present();
  }


}
