import { Component, Inject,  OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-prenda',
  templateUrl: './prenda.component.html',
  styleUrls: ['./prenda.component.scss'],
})
export class PrendaComponent  implements OnInit {
  info: any;
  subtipos : any[] = [];
  caracteristicas : any[] = [];
  filtros : any[] = [];
  hasSubtipos = false;
  caracs?: any;
  hasCaracs = false;

  constructor(
    @Inject(MAT_DIALOG_DATA,) public data: any,
    public dialog: MatDialog,
    private conexion: ConexionService
  ) {
    this.info = data;
    console.log(this.info);
  }

  ngOnInit() {}

  tipoSelectEvent(item: any) {
    // Aquí va el filtrado
    this.subtipos = [{}];
    this.conexion.post('categoria', 'getSubtipos', {idTipo: item.id}).subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach((subtipo: any) => {
          this.subtipos.push({id: subtipo.idSubtipo, name: subtipo.nombreSubtipo});
        });
        this.hasSubtipos = true;
        this.filtros.push({"nombre":"Subtipo", "activo": false, "contenido": this.subtipos, "funcion": (id: any) => { this.tipoSelectEvent(id) }});
      } else this.hasSubtipos = false;
    })
    // this.prendasFiltradas.filter((prenda: any) => {
    //   return prenda.tipo == item.nombreTipo;
    // })
  }

  subtipoSelectEvent(item: any) {
    // Aquí va el filtrado
    this.caracs = [{}];
    this.conexion.post('categoria', 'getCaracteristicas', {idSubtipo: item.id}).subscribe((data: any) => {
      if (data.length > 0) {
        data.forEach((carac: any) => {
          this.caracs.push({id: carac.idCaracteristica, name: carac.nombreCaracteristica});
        });
        this.hasCaracs = true;
        this.filtros.push({"nombre":"Caracteristicas", "activo": false, "contenido": this.caracteristicas });
      } else this.hasCaracs = false;
    })
    // this.prendasFiltradas.filter((prenda: any) => {
    //   return prenda.subtipo == item.nombreSubtipo;
    // })
  }

}
