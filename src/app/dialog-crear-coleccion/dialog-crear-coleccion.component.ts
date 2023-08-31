import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-crear-coleccion',
  templateUrl: './dialog-crear-coleccion.component.html',
  styleUrls: ['./dialog-crear-coleccion.component.scss'],
})
export class DialogCrearColeccionComponent  implements OnInit {

  formularioColeccion: FormGroup = this.fb.group({
    nombreColeccion: [, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {}

  crearColeccion(){
    console.log("Se creó " + this.formularioColeccion.controls['nombreColeccion'].value);
  }

}
