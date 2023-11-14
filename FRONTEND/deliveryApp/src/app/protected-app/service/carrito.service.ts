import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoRequest } from '../interface/carrito-request';
import { CarritoResponse } from '../interface/carrito-response';
import {CarritoProductoRequest} from '../interface/carrito-producto-request'
import {CarritoProductoResponse} from '../interface/carrito-producto-response'
import { CarritoConProductos } from '../interface/carrito-con-productos';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  private apiUrl = `${environment.baseUrl}/carrito`; 

  constructor(private http: HttpClient) { }

  getCarritosOfUsuario(usuarioId: number): Observable<CarritoConProductos[]> {
    return this.http.get<CarritoConProductos[]>(`${this.apiUrl}/usuario/${usuarioId}/productos`);
  }

  getCarritosOfNegocio(negocioId: number): Observable<CarritoResponse[]> {
    return this.http.get<CarritoResponse[]>(`${this.apiUrl}/negocio/${negocioId}`);
  }

  getCarritoById(carritoId: number): Observable<CarritoResponse> {
    return this.http.get<CarritoResponse>(`${this.apiUrl}/${carritoId}`);
  }

  getProductosEnCarrito(carritoId: number): Observable<CarritoProductoResponse[]> {
    return this.http.get<CarritoProductoResponse[]>(`${this.apiUrl}/${carritoId}/productos`);
  }

  createCarrito(carrito: CarritoRequest): Observable<CarritoResponse> {
    return this.http.post<any>(`${this.apiUrl}/create`, carrito);
  }

  agregarProductoAlCarrito(userId: number, negocioId: number, carrito: CarritoProductoRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar/usuario/${userId}/negocio/${negocioId}`, carrito);
  }

  modificarCantidadDeProducto(carritoId: number, carrito: CarritoProductoRequest): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modificar/${carritoId}/producto`, carrito);
  }

  deleteCarrito(carritoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${carritoId}`);
  }

  eliminarProductoDeCarrito(carritoId: number, productoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${carritoId}/productos/${productoId}`);
  }

}
