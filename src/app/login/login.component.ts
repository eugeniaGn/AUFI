import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Formulario: FormGroup = this.fb.group({
    correo: [, [Validators.required, Validators.email]],
    contrasena: [, [Validators.required]],

  });
  loading = false;
  constructor(private fb: FormBuilder, public auth: AuthService,
    private router: Router, private conexion: ConexionService) {
  }

  ngOnInit() { }

  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }

  login() {
    this.loading = true;
    this.conexion.post('usuario', 'login', this.Formulario.value).subscribe((datos: any) => {
      if (datos) {
        this.auth.login(datos);
        this.loading = false;
      }
    });
  }

  registro() {
    this.router.navigate(['/registro']);
  }
}
