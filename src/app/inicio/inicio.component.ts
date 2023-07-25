import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  tipos : any[] = [];
  subtipos : any[] = [];
  prendas : any[] = [];
  accesorios : any[] = [];
  usado:boolean = false;
  gusta:boolean = false;
  guardado:boolean = false;
  isButtonFocused = false;
  isDivVisible = false;
  isArticleFocused = false;

  constructor(
    private conexion: ConexionService,
    private router: Router
  ) { }

  ngOnInit() {}

  obtenerTipos() {
    this.conexion.get('armario', 'getTipos').subscribe((dato: any) => {
      this.tipos;
    });
  }

  obtenerSubtipos() {
    this.conexion.get('armario', 'getSubtipos').subscribe((dato: any) => {
      this.tipos;
    });
  }

  obtenerPrendas() {
    this.conexion.get('prenda', 'getPrendas').subscribe((dato: any) => {
      this.prendas;
    });
  }

  obtenerAccesorios() {
    this.conexion.get('accesorio', 'getAccesorios').subscribe((dato: any) => {
      this.accesorios;
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

  crearOutfit(){
    this.router.navigate(['/crearOutfit']);
  }

  toggleDivVisibility() {
    this.isDivVisible = !this.isDivVisible;
  }

  toggleFocus() {
    // document.getElementById("mas")?.hidden = !document.getElementById("mas").hidden;
    this.isButtonFocused = !this.isButtonFocused;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

}
