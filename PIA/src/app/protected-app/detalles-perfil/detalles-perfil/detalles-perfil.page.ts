import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioRequest } from '../../interface/usuario-request';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PwdChangeModalComponent } from '../../component/pwd-change-modal/pwd-change-modal/pwd-change-modal.component';
import { EmailChangeModalComponent } from '../../component/email-change-modal/email-change-modal/email-change-modal.component';



@Component({
  selector: 'app-detalles-perfil',
  templateUrl: './detalles-perfil.page.html',
  styleUrls: ['./detalles-perfil.page.scss'],
})
export class DetallesPerfilPage implements OnInit {

  usuarioId: any;
  respuesta: any;
  perfilForm!: FormGroup;

  usuario: UsuarioRequest = {id: 0, nombre: "", email: "", contraseña: "", telefono: "", facultadId: 1, fotoPerfilUrl: ""}
  usuarioData: any;


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
    
  ) { }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      facultad: [Validators.required],
    });

    this.usuarioId = this.route.snapshot.paramMap.get('usuarioId');
    console.log("id", this.usuarioId)

    this.obtenerInfo();

  }



  obtenerInfo(){
    this.usuarioService.getUsuarioById(this.usuarioId).subscribe(
      (response:any) => {
        this.usuarioData = response;
      },
      (error) => {
        console.error('Error al obtener la información', error)
      }
    );
  }

  enviarInfo(){
    this.usuarioService.updateUsuario(this.usuarioId, this.usuario).subscribe(
      (response:any) => {
        console.log(response)
      },
      (error) => {
        console.error('Error al guardar la información')
      }
    );
  }

  guardarPerfil() {
    
    if (this.perfilForm.valid) {
      this.usuario.id = this.usuarioId;
      this.usuario.nombre = this.perfilForm.get('nombre')?.value;
      this.usuario.telefono = this.perfilForm.get('telefono')?.value;
      this.usuario.facultadId = this.perfilForm.get('facultad')?.value;
      this.enviarInfo();
    }
  }

  cambiarContra(){
    this.openPwdChangeModal(this.usuarioId);
  }

  cambiarEmail(){
    this.openEmailChangeModal(this.usuarioId);
    this.obtenerInfo();
  }

  async openPwdChangeModal(usuarioId: number){
    const modal = await this.modalCtrl.create({
      component: PwdChangeModalComponent,
      componentProps:{
        userId: usuarioId,
      }
    });
    return await modal.present();
  }

  async openEmailChangeModal(usuarioId: number){
    const modal = await this.modalCtrl.create({
      component: EmailChangeModalComponent,
      componentProps:{
        userId: usuarioId,
        userEmail: this.usuarioData.email
      }
    });
    return await modal.present();
  }

}