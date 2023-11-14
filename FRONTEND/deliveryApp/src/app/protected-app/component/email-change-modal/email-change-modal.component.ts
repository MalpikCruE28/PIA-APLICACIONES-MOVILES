import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmailChange } from 'src/app/protected-app/interface/email-change';
import { UsuarioService } from 'src/app/protected-app/service/usuario.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-email-change-modal',
  templateUrl: './email-change-modal.component.html',
  styleUrls: ['./email-change-modal.component.scss'],
})
export class EmailChangeModalComponent  implements OnInit {

  userId: any;

  cambioEmailForm!: FormGroup;

  userEmail: any;
  NewEmail: string = '';
  pwd: string = '';
  
  request: EmailChange = {emailActual: '', emailNuevo: '', pwd:''};

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) { 

    this.cambioEmailForm = this.formBuilder.group({
      nuevoEmail: ['', Validators.required],
      contra: ['', Validators.required]
    });
  }

  ngOnInit() {}



  cambiarEmail() {

    if (this.cambioEmailForm.valid) {
      this.NewEmail = this.cambioEmailForm.get('nuevoEmail')?.value;
      this.pwd = this.cambioEmailForm.get('contra')?.value;

      this.request.emailActual = this.userEmail;
      this.request.emailNuevo = this.NewEmail;
      this.request.pwd = this.pwd;

      this.usuarioService.updateEmailUsuario(this.userId, this.request).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this.presentToast("Email actualizado");

        },
        (error) => {
          console.error(error);
          this.presentToast(error.error.message)
        }
      );
    }

  }

  close(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
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
