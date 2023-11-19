import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuarioId = parseInt(localStorage.getItem('userId') || '', 10);
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerInfoUsuario();
  }

  ionViewWillEnter(){
    this.obtenerInfoUsuario();
  }

  obtenerInfoUsuario(){
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (response: any) => {
        this.usuario = response;
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error)
      }
    );
  }

  editarInfo() {
    this.router.navigate(['/detalles-perfil', this.usuarioId]);
  }

  cerrarSesion(){
    this.authService.logOut();
    this.router.navigate(['/main']);
  }


}
