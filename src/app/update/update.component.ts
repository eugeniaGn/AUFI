import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent  implements OnInit {

  Genero: string[] = ["Masculino", "Femenino"]

  Registro: FormGroup = this.fb.group({
    idUsuario: [, Validators.required],
    nombresUsuario: [, Validators.required],
    apellidoP: [, Validators.required],
    apellidoM: [, Validators.required],
    telefono: [, Validators.required],
    correo: [, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    userName: [, Validators.required],
    fechaNacimiento: [, Validators.required],
    genero: [, Validators.required],
    contrasena: [, Validators.required],
  });

  nuevo = {
    genero: ''
  };

  constructor(private fb: FormBuilder, private conexion: ConexionService, private router: Router) {
  }
  ngOnInit(): void {
  }
  campoEsValido(campo: string) {
    return this.Registro.controls[campo].errors && this.Registro.controls[campo].touched;
  }
  guardar() {
    this.conexion.post('usuario', 'agregarUsuario', this.Registro.value).subscribe((dato: any) => {
      console.log(dato);
      if (['estatus']) {
        console.log("Exito");

        this.Registro.reset();
        this.router.navigate(['login']);
      }

    })
  }
  ObtenerRegistro(aufiToken: any) {
    this.conexion.post('usuario', 'traerUsuario', { 'aufiToken': aufiToken }).subscribe((dato: any) => {
      this.Registro.patchValue({
        idUsuario: dato.idUsuario,
        nombresUsuario: dato.nombresUsuario,
        apellidoP: dato.apellidoP,
        apellidoM: dato.apellidoM,
        telefono: dato.telefono,
        correo: dato.correo,
        userName: dato.userName,
        fechaNacimiento: dato.fechaNacimiento,
        genero: dato.genero,
        contrasena: dato.contrasena,
      });
    });
  }
}
