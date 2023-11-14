import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CarritoProductoRequest } from 'src/app/protected-app/interface/carrito-producto-request';
import { CarritoService } from 'src/app/protected-app/service/carrito.service';
import { ProductoService } from 'src/app/protected-app/service/producto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-producto-modal',
  templateUrl: './detalle-producto-modal.component.html',
  styleUrls: ['./detalle-producto-modal.component.scss'],
})
export class DetalleProductoModalComponent  implements OnInit {

  usuarioId: any;
  productoId: any;
  negocioId: any;
  cantidad: number = 1;
  cantidadMin: number = 1;
  cantidadMax: number = 20;
  peticion: CarritoProductoRequest = {cartId: 0, productoId: 0, cantidad: 0};
  producto: any;
  mensaje: any;

  constructor( 
    private modalCtrl: ModalController,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private toastController: ToastController
  ) { }

    ngOnInit() {
      this.obtenerProducto();
      this.cantidad = 1;
    }

    obtenerProducto() {
      this.productoService.getProductoById(this.productoId).subscribe(
        (resultado) => {
          this.producto = resultado;
        },
        (error) => {
          console.error('Error al obtener el producto', error);
        }
      );
    }
  
    agregarAlCarrito() {
  
      this.peticion.cartId = 0;
      this.peticion.cantidad = this.cantidad;
      this.peticion.productoId = this.productoId;
  
      this.carritoService.agregarProductoAlCarrito(this.usuarioId, this.negocioId, this.peticion).subscribe(
        () => {
          console.log('producto agregado correctamente')
          this.presentToast("Producto agregado al carrito");
        },
        (error) => {
          console.error('Error al agregar el producto al carrito', error);
          this.mensaje = error.error.message;
          this.presentToast(this.mensaje);
        }
      );

      this.close();
    }

    close(){
      this.modalCtrl.dismiss({
        'dismissed': true
      });
    }

    incrementarCantidad(){
      if(this.cantidad < this.cantidadMax)
        this.cantidad += 1;
      else
        this.cantidad = this.cantidadMax;
    }

    decrementarCantidad(){
      if(this.cantidad > this.cantidadMin)
        this.cantidad -= 1;
      else
        this.cantidad = this.cantidadMin;
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
