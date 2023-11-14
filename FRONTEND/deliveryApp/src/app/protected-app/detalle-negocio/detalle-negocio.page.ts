import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/protected-app/service/producto.service';
import { NegocioService } from 'src/app/protected-app/service/negocio.service';
import { Producto } from 'src/app/protected-app/interface/producto';
import { Negocio } from 'src/app/protected-app/interface/negocio';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DetalleProductoModalComponent } from '../component/detalle-producto-modal/detalle-producto-modal.component';

@Component({
  selector: 'app-detalle-negocio',
  templateUrl: './detalle-negocio.page.html',
  styleUrls: ['./detalle-negocio.page.scss'],
})
export class DetalleNegocioPage implements OnInit {
  
  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  negocioId: any;
  productos: Producto[] = [];
  negocio: any;

  constructor( 
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private negocioService: NegocioService,
    private router: Router,
    private modalCtrl: ModalController,
    
  ) { }


  ngOnInit() {
    this.negocioId = this.route.snapshot.paramMap.get('negocioId');
    this.obtenerNegocio();
    this.obtenerProductos();
  
  }

  obtenerProductos() {
    this.productoService.getProductosByNegocioId(this.negocioId).subscribe(
      (productos) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  obtenerNegocio() {
    this.negocioService.getNegocioById(this.negocioId).subscribe(
      (resultado) => {
        this.negocio = resultado;
      },
      (error) => {
        console.error('Error al obtener el negocio', error);
      }
    );
  }

  verProducto(productoId: number) {
    this.openProductoModal(productoId);
  }

  async openProductoModal(productoId: number){
    const modal = await this.modalCtrl.create({
      component: DetalleProductoModalComponent,
      componentProps:{

        usuarioId: this.usuarioId,
        productoId: productoId,
        negocioId: this.negocioId
      }
    });
    console.error(productoId);
    return await modal.present();
  }


}
