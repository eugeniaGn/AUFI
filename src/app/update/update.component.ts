import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {

  Genero: string[] = ["Masculino", "Femenino"];

  Usuario: any = {};

  nuevo = {
    genero: ''
  };

  Registro: FormGroup = this.fb.group({
    idUsuario: ['', Validators.required],
    nombresUsuario: ['', Validators.required],
    apellidoP: ['', Validators.required],
    apellidoM: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
    userName: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private conexion: ConexionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const idUsuario = this.activatedRoute.snapshot.params['idUsuario'];
    this.obtenerUsuario(idUsuario);
  }

  obtenerUsuario(idUsuario: any) {
    this.conexion.post('usuario', 'traerUsuarioxid', { 'idUsuario': idUsuario }).subscribe((data: any) => {
        console.log(data);
        if (data) {
          this.Registro.patchValue({
            idUsuario: data.idUsuario,
            nombresUsuario: data.nombresUsuario,
            apellidoP: data.apellidoP,
            apellidoM: data.apellidoM,
            telefono: data.telefono,
            correo: data.correo,
            userName: data.userName,
            fechaNacimiento: data.fechaNacimiento,
            genero: data.genero,
          });
        } else {
          console.error('No data received for user with ID:', idUsuario);
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.Registro.controls[campo].errors && this.Registro.controls[campo].touched;
  }

  guardar() {
    this.conexion.post('usuario', 'editarUsuario', this.Registro.value).subscribe((dato: any) => {
      console.log(dato);
      if (['estatus']) {
        console.log("Exito");

        this.Registro.reset();
        this.router.navigate(['perfil']);
      }

    })
  }
  
}