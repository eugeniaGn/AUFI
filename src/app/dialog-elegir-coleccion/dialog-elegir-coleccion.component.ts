import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearColeccionComponent } from '../dialog-crear-coleccion/dialog-crear-coleccion.component';

@Component({
  selector: 'app-dialog-elegir-coleccion',
  templateUrl: './dialog-elegir-coleccion.component.html',
  styleUrls: ['./dialog-elegir-coleccion.component.scss'],
})
export class DialogElegirColeccionComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialogElegirColeccion() {
    let dialogRef = this.dialog.open(DialogCrearColeccionComponent, {
      width: '100%',
    });
  }

  escogerColeccion(){
    console.log('Se guardó el outfit en la colección');
  }
}
