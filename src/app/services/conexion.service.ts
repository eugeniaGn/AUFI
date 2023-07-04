import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  baseUrl = '';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  Get(Modelo: string, Accion: string){
    return this.http.get(`${this.baseUrl}${Modelo}.php?opcion=${Accion}`);
  }

  Post(Modelo: string, Accion: string, Datos: any){
    return this.http.post(`${this.baseUrl}${Modelo}.php?opcion=${Accion}`, Datos);
  }
}
