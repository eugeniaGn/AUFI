import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {}

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
