import { Component, OnInit } from '@angular/core';
import {PedidoService} from '../service/pedido.service'
import { PedidoRequest } from '../interface/pedido-request';
import { PedidoResponse } from '../interface/pedido-response';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);

  pedidos: PedidoResponse[] = [];
  pedidosActivos: PedidoResponse[] = [];
  pedidosInactivos: PedidoResponse[] = [];

  pedido: PedidoRequest = { userId: 0, businessId: 0, carritoId: 0, 
    direccionEntrega: '', metodopagoId: 0, total: 0, status: ''}
  
  constructor(
    private pedidoService: PedidoService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getPedidos(this.usuarioId);
  }

  ionViewWillEnter(){
    this.getPedidos(this.usuarioId);
  }
  getPedidos(usuarioId: any){
    this.pedidoService.getPedidosByUsuarioId(usuarioId).subscribe(
      (response) => {
        this.pedidos = response;
        this.separarPedidos();
      },
      (error) => {
        console.error('Error al obtener los pedidos', error);
      }
    )
  }

  separarPedidos() {
    this.pedidosActivos = this.pedidos.filter(
      (pedido) => pedido.status === 'aceptado' || pedido.status === 'pendiente'
    );

    this.pedidosInactivos = this.pedidos.filter(
      (pedido) => pedido.status === 'completado' || pedido.status === 'rechazado'
    );
  }


  eliminarPedido(pedidoId: number){
    this.pedidoService.eliminarPedido(pedidoId).subscribe(
      (response: any) => {
        this.getPedidos(this.usuarioId)
      },
      (error) => {
        console.error("error al eliminar el pedido", error);
        this.presentToast(error.error.message);
      }
    )
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      position: 'bottom',
    });

    await toast.present();
  }



}
