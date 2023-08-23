import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  verificacion()/*:Observable<boolean>*/{
    return localStorage.getItem('aufiToken') != null ? true : false;
  }

  login(tokenUsuario: string) {
    localStorage.removeItem('aufiToken');
    localStorage.setItem('aufiToken', tokenUsuario);
    this.router.navigateByUrl('inicio');
  }

  logout() {
    localStorage.removeItem('aufiToken');
  }
}
