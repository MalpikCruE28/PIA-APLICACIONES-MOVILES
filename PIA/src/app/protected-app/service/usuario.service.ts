import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from '../interface/usuario-response';
import { UsuarioRequest } from '../interface/usuario-request';
import { PasswordChange } from '../interface/password-change';
import { EmailChange } from '../interface/email-change';
import { UserCreds } from '../../auth/interface/user-creds';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  //private apiUrl = 'https://localhost:7126/api/usuario';
  private apiUrl = `${environment.baseUrl}/usuario`;

  getUsuarioById(id: number): Observable<UsuarioResponse> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  createUsuario(usuario: UsuarioRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, usuario);
  }

  updateUsuario(id: number, usuario: UsuarioRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, usuario);
  }

  updatePasswordUsuario(id: number, usuarioData: PasswordChange): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/password/${id}`, usuarioData);
  }

  updateEmailUsuario(id: number, usuarioData: EmailChange): Observable<UserCreds> {
    return this.http.put<any>(`${this.apiUrl}/update/email/${id}`, usuarioData);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
