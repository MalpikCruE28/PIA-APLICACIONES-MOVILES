import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioRequest } from 'src/app/protected-app/interface/usuario-request';
import { UserRegister } from '../interface/user-register';
import { UserLogin } from '../interface/user-login';
import { UserCreds } from '../interface/user-creds';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private route: Router) { }

  private apiUrlLogin = `${environment.baseUrl}/login`;
  private apiUrlRegister = `${environment.baseUrl}/usuario`;

  login(usuario: UserLogin): Observable<UserCreds> {
    return this.http.post<any>(`${this.apiUrlLogin}/autenticar/usuario`, usuario);
  }
  
  register(usuario: UserRegister): Observable<any> {
    return this.http.post<any>(`${this.apiUrlRegister}/create`, usuario);
  }

  validateToken(token: string): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrlLogin}/validate-token`, {headers});
  }

  logOut(){
    localStorage.clear();
  }


}
