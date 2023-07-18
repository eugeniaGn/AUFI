import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  verificacion()/*:Observable<boolean>*/{
    return localStorage.getItem('aufiToken') != null ? true : false;
  }

  login(tokenUsuario: string) {
    localStorage.setItem('aufiToken', tokenUsuario);
  }

  logout() {
    localStorage.removeItem('aufiToken');
  }
}
