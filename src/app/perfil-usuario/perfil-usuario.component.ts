import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent  implements OnInit {
  Usuario: any[] = [] ;
  constructor(private conexion: ConexionService) {
   this.obtenerUsuario();
  }

 /*  obtenerUsuario() {
    this.conexion.get('usuario', 'GetAll').subscribe((dato: any) => {
      this.Usuario = dato;
      console.log(this.Usuario);
    });
  } */
  ngOnInit(): void {
  }

  obtenerUsuario() {
    this.conexion.get('usuario', 'traerUsuarioxid').subscribe((data: any) => {
      if (data) {
        this.Usuario = data;
      } else {
        alert('No pudimos obtener el usuario.');
      }
    })
  }
}
