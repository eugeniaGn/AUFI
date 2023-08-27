import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-elegir-prenda',
  templateUrl: './dialog-elegir-prenda.component.html',
  styleUrls: ['./dialog-elegir-prenda.component.scss'],
})
export class DialogElegirPrendaComponent  implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA,) public idTipos: any,
    public dialog: MatDialog
  ) {
    console.log(this.idTipos);
  }

  ngOnInit() {}

}
