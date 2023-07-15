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
export class LoginComponent  implements OnInit {
  Formulario: FormGroup = this.fb.group({
    correo: [, [Validators.required,]],
    contrasena: [, [Validators.required,]],
    
  });
  constructor(  private fb: FormBuilder,public auth:AuthService,
    private router: Router, private conexion: ConexionService) {
   }

  ngOnInit() {}
  campoEsValido(campo: string) {
    return this.Formulario.controls[campo].errors && this.Formulario.controls[campo].touched;
  }
  Login(){
    console.log(this.Formulario.value);
    this.conexion.post('usuario', 'login', this.Formulario.value).subscribe((datos: any)=>{  
      console.log(datos);    
      if(datos.idUsuario != undefined){
        this.auth.Login(datos.idUsuario);
        this.router.navigate(['/login']); 
      }
    });
  }
  registro(){
    this.router.navigate(['/registro']);
  }
}
