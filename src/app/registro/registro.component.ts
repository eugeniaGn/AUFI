import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-registro',
  templateUrl: '/registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  Genero: string[] = ["Masculino", "Femenino"]

  Registro: FormGroup = this.fb.group({
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
}