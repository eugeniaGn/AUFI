import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  baseUrl = 'http://localhost/aufiservices/controller/';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Allow-Origin': '*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  get(modelo: string, accion: string){
    return this.http.get(`${this.baseUrl}${modelo}.php?option=${accion}`);
  }

  post(modelo: string, accion: string, datos: any){
    return this.http.post(`${this.baseUrl}${modelo}.php?option=${accion}`, datos);
  }
}
