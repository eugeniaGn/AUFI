import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  baseUrl = env.baseServicesURL;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8',
      'Allow-Origin': '*',
      'Authorization': `Bearer ${localStorage.getItem('aufiToken')}`,
      'ngrok-skip-browser-warning': 'true'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  get(modelo: string, accion: string){
    return this.http.get(`${this.baseUrl}${modelo}.php?option=${accion}`, this.httpOptions);
  }

  post(modelo: string, accion: string, datos: any){
    return this.http.post(`${this.baseUrl}${modelo}.php?option=${accion}`, datos, this.httpOptions);
  }
}
