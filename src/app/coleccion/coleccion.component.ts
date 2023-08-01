import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-coleccion',
  templateUrl: './coleccion.component.html',
  styleUrls: ['./coleccion.component.scss'],
})
export class ColeccionComponent  implements OnInit {

  outfits = [
    {image: ''},
    {image: ''},
    {image: ''},
    {image: ''},
    {image: ''},
];
  coleccionName = '';

  constructor(private ar: ActivatedRoute, private conx: ConexionService) {
    this.getOutfits();
    this.coleccionName = this.ar.snapshot.params['name'];
  }

  ngOnInit() {}

  getOutfits() {
    this.conx.post('coleccion', 'getColeccion', {'id': this.ar.snapshot.params['id']}).subscribe((data: any) => {
      if (data) this.outfits = data;
    })
  }

  openOutfit() {

  }
}
