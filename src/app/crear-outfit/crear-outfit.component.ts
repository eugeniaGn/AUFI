import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogElegirPrendaComponent } from '../dialog-elegir-prenda/dialog-elegir-prenda.component';

@Component({
  selector: 'app-crear-outfit',
  templateUrl: './crear-outfit.component.html',
  styleUrls: ['./crear-outfit.component.scss'],
})
export class CrearOutfitComponent  implements OnInit {
  usado:boolean = false;
  gusta:boolean = false;
  guardado:boolean = false;

  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {}

  openDialogElegir(data: any) {
    console.log(data);
    let dialogRef = this.dialog.open(DialogElegirPrendaComponent, { width: '85%', height: '85%', data }
    );

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  loUse(){
    if(this.usado == false){
      this.usado = true;
    }else{
      this.usado = false;
    }
  }

  meGusta(){
    if(this.gusta == false){
      this.gusta = true;
    }else{
      this.gusta = false;
    }
  }

  guardar(){
    if(this.guardado == false){
      this.guardado = true;
    }else{
      this.guardado = false;
    }
  }

}
