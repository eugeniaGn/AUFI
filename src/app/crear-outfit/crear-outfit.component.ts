import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogElegirPrendaComponent } from '../dialog-elegir-prenda/dialog-elegir-prenda.component';
import { ConexionService } from '../services/conexion.service';
import { DialogElegirColeccionComponent } from '../dialog-elegir-coleccion/dialog-elegir-coleccion.component';

@Component({
  selector: 'app-crear-outfit',
  templateUrl: './crear-outfit.component.html',
  styleUrls: ['./crear-outfit.component.scss'],
})
export class CrearOutfitComponent  implements OnInit {
  usado:boolean = false;
  gusta:boolean = false;
  guardado:boolean = false;

  contenedores = new Array(12);

  prenda: any;
  outfit: any = {prendas: []};
  prendas: any[]  = [];


  constructor(
    public dialog: MatDialog,
    private conx: ConexionService
  ) {
  }

  async getData() {
    await this.obtenerPrendas();
    await this.obtenerAccesorios();
  }

  ngOnInit() {}

  async obtenerPrendas() {
    this.conx.get('prenda', 'getPrendas').subscribe((data: any) => {
      this.prendas = data;
    });
  }

  async obtenerAccesorios() {
    this.conx.get('accesorio', 'getAccesorios').subscribe((dato: any) => {
      dato.forEach((accesorio: any) =>{
        this.prendas.push(accesorio);
      });
    });
  }

  openDialogElegirPrenda(index: any) {
    let dialogRef = this.dialog.open(DialogElegirPrendaComponent, { width: '100%', height: '100%'});

    dialogRef.afterClosed().subscribe(result => {
      this.contenedores[index] = result;
      this.outfit.prendas.push(result?.idPrenda);
    });
  }

  openDialogElegirColeccion() {
    let dialogRef = this.dialog.open(DialogElegirColeccionComponent, { width: '100%', height: '50%'});
  }

  loUse(){
    if(this.usado == false){
      this.usado = true;
      console.log(this.usado);
    }else{
      this.usado = false;
      console.log(this.usado);
    }
  }

  meGusta(){
    if(this.gusta == false){
      this.gusta = true;
    }else{
      this.gusta = false;
    }
  }

  agregarColeccion(){
    if(this.guardado == false){
      this.guardado = true;
    }else{
      this.guardado = false;
    }
  }

  quitarPrenda(index: any){
    this.contenedores[index] = '';
  }

  guardarOutfit() {
    // this.conx.post('outfit', 'addOutfits', {response: {outfits: [this.outfit]}}).subscribe((data: any) => {
    //   if (data) {
    //     alert('Outfit agregado!');
    //     this.contenedores.forEach(contenedor => {
    //       contenedor.splice(0);
    //     });
    //     this.outfit.splice(0);
    //   }
    // })
  }

}
