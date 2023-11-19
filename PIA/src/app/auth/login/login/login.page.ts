import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../service/auth.service';
import { UserLogin } from '../../interface/user-login';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  loginForm!: FormGroup;
  datos: UserLogin = {email: '', pwd: ''}

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {

    if (this.loginForm.valid) {
      this.datos.email = this.loginForm.get('email')?.value;
      this.datos.pwd = this.loginForm.get('password')?.value;
      this.Autenticar(this.datos);
    }

  }

  Autenticar(datos: UserLogin){
    this.authService.login(datos).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id);



        // Redirigir a la página de inicio
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.presentToast(error.error.message)
      }
    );
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
