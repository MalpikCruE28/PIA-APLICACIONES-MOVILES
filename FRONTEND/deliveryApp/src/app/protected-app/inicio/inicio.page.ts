import { Component, OnInit } from '@angular/core';
import { NegocioService } from '../service/negocio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);

  listaNegocios: any[] = [];

  constructor(private negocioService: NegocioService, private router: Router) {}

  
  ngOnInit() {
    this.obtenerNegocios();
  }

  obtenerNegocios() {
    this.negocioService.getAllNegocios().subscribe(
      (response: any) => {
        this.listaNegocios = response;
      },
      (error) => {
        console.error('Error al obtener la lista de negocios:', error);
      }
    );
  }

  verProductos(negocioId: number) {
    this.router.navigate(['/detalle-negocio', negocioId]);
  }

  verCarritos() {
    //const usuarioId = obtenerIdUsuario(); // Aquí debes obtener el ID del usuario actual
    this.router.navigate(['/carritos', this.usuarioId]);
  }

  

}

