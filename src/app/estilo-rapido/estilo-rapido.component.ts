import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../services/conexion.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElegirColeccionComponent } from '../dialog-elegir-coleccion/dialog-elegir-coleccion.component';

@Component({
  selector: 'app-estilo-rapido',
  templateUrl: './estilo-rapido.component.html',
  styleUrls: ['./estilo-rapido.component.scss'],
})
export class EstiloRapidoComponent  implements OnInit {
  private lastOnStart: number = 0;
  private DOUBLE_CLICK_THRESHOLD: number = 500;
  gusta:boolean = false;
  guardado:boolean = false;

  outfits: any = [];
  loading = false;

  constructor(
    private conexion: ConexionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.obtenerOutfits();
  }

  obtenerOutfits() {
    this.conexion.get('outfit', 'getOutfits').subscribe((data: any) => {
      var currentOutfit = -1;
      var currentIndex = 0;
      var index = -1;
      data.forEach((outfit: any) => {
        if (currentOutfit == outfit.id) {
          this.outfits[currentIndex].push({prenda: outfit.prenda, tipo: outfit.nombreTipo, imagen: outfit.imagen});
        } else {
          index++;
          this.outfits[index] = [{prenda: outfit.prenda, tipo: outfit.nombreTipo, imagen: outfit.imagen}];
          currentOutfit = outfit.id;
          currentIndex = index;
        }
      });
    }).add(() => {
      this.loading = false;
    })

    console.log(this.outfits);
  }

  onStart(outfit: any) {
    const now = Date.now();
    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.likeOutfit(outfit);
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }
  }

  likeOutfit(outfit: any) {
    if (localStorage.getItem('likes') == null) {
      localStorage.setItem('likes', JSON.stringify([]));
    }
    const likes = JSON.parse(localStorage.getItem('likes')!);
    likes.push(outfit);
    localStorage.setItem('likes', JSON.stringify(likes));
  }

  meGusta(){
    if(this.gusta == false){
      this.gusta = true;
    }else{
      this.gusta = false;
    }
  }

  openDialogElegirColeccion() {
    let dialogRef = this.dialog.open(DialogElegirColeccionComponent, { width: '100%', height: '50%'});
  }


}
