import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  Verificacion()/*:Observable<boolean>*/{
    return localStorage.getItem('idUsuario') != null ? true : false;
  }

  Login(idUsuario:string){
    localStorage.setItem('idUsuario', idUsuario);
  }

  logout(){
    localStorage.clear();
  }
}
