import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-colecciones',
  templateUrl: './colecciones.component.html',
  styleUrls: ['./colecciones.component.scss'],
})
export class ColeccionesComponent  implements OnInit {
  colecciones = [
    {id: 1, name: "Match con mi novia"},
    {id: 2, name: "Para el pedo"},
    {id: 3, name: "Uni fresh"},
    {id: 4, name: "Lazy pero con drip"},
    {id: 5, name: "Uno de esos días"}
  ];

  constructor(private router: Router, private conx: ConexionService) { }

  ngOnInit() {}

  goToColeccion(coleccion: any) {
    this.router.navigateByUrl('coleccion/' + coleccion.name + '/'+coleccion.id);
  }

  getColecciones() {
    this.conx.get('coleccion', 'getColecciones').subscribe((data: any) => {
      if (data) this.colecciones = data;
    })
  }

}
