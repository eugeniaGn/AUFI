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
  prendas : any[] = [
    {"tipo":"Jeans"},
    {"tipo":"Blusa"},
    {"tipo":"Cinturon"},
    {"tipo":"Pashmina"},
    {"tipo":"Pants"},
    {"tipo":"Blazer"},
    {"tipo":"Abrigo"},
    {"tipo":"Tenis"},
    {"tipo":"Sudadera"},
    {"tipo":"Pulsera"},
    {"tipo":"Anillo"},
    {"tipo":"Vestido"},
    {"tipo":"Gorra"},
    {"tipo":"Sombrero"},
    {"tipo":"Chamarra"},
    {"tipo":"Short"},
  ];
  prendasFiltradas : any [] = [];
  accesorios : any[] = [];

  filtros : any[] =
  [
    {"nombre":"Tipo", "activo": false, "icono": true},
    {"nombre":"Estilo", "activo": false, "icono": false},
    {"nombre":"Material", "activo": false, "icono": false},
    {"nombre":"Color", "activo": false, "icono": false},
    {"nombre":"Marca", "activo": false, "icono": false},
    {"nombre":"Clima", "activo": false, "icono": false},
  ];

  filtroActivo:boolean = false;
  escribiendo:string = "";

  constructor(
    private conexion: ConexionService,
    private router: Router
  ) {
  }

  ngOnInit() {}

  obtenerTipos() {
    this.conexion.get('armario', 'getTipos').subscribe((dato: any) => {
      this.tipos;
      console.log(dato);
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

  toggleFiltrar(nombreF:string) {
    switch (nombreF) {
      case "Tipo":
        this.filtros[0].activo = !this.filtros[0].activo;
        // console.log("Tipo");
        console.log(this.filtros[0].activo);
        break;
      case "Estilo":
        this.filtros[1].activo = !this.filtros[1].activo;
        // console.log("Estilo");
        break;
      case "Material":
        this.filtros[2].activo = !this.filtros[2].activo;
        // console.log("Material");
        break;
      case "Color":
        this.filtros[3].activo = !this.filtros[3].activo;
        // console.log("Color");
        break;
      case "Marca":
        this.filtros[4].activo = !this.filtros[4].activo;
        // console.log("Marca");
          break;
      case "Clima":
        this.filtros[5].activo = !this.filtros[5].activo;
        // console.log("Marca");
        break;
    }
  }

  crearOutfit(){
    this.router.navigate(['/crearOutfit']);
  }

  buscando(escribiendo: string, data: any){
    if(escribiendo == ""){
      for(var i = 0; i < this.filtros.length; i++){
        this.filtros[i].activo = false;
      }
      return true;
    } else {
      this.buscar(data)
      return false;
    }
  }

  buscar(data: any) {
    const filtroValue = (data.target as HTMLInputElement).value.trim()?.toLocaleLowerCase();

    // Buscar platillo en menú completo
    // if (buscarEn == 'menu') {

      this.prendasFiltradas = this.prendas.filter((prenda: any) => {
        let textoInput: any = '';

        for (let i = 0; i < filtroValue.length; i++) {
          textoInput = textoInput + this.filtro(filtroValue[i]);
        }

        let busqueda: any = prenda.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput);

        return busqueda;
      });

      // Buscar platillo en menú completo
    // }
    //  else if (buscarEn == 'temporada') {

    //   this.prendasFiltradasT = this.prendasT.filter((plato: any) => {
    //     let textoInput: any = '';

    //     for (let i = 0; i < filtroValue.length; i++) {
    //       textoInput = textoInput + this.filtro(filtroValue[i]);
    //     }

    //     let busqueda: any = plato.nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) || plato.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleUpperCase().includes(textoInput) ||
    //       plato.precioBase.toString().includes(textoInput)

    //       console.log(plato.categoria);
    //     return busqueda;
    //   });

    // }
  }


    filtro(textoInput: any) {

      let simbolos = new String('#$@%&|^`´*çÇ');
      var arrA = new String('áàäâÀÁÄÂ');
      let arrE = new String('éèëêÈÉËÊEÊ€');
      let arrI = new String('íìïîÍÌÏÎ');
      let arrO = new String('óòôöÓÒÖÔ');
      let arrU = new String('úùüüÚÙÜÛ');



      for (let i = 0; i < simbolos.length; i++) {
        if (textoInput == simbolos.charAt(i)) {
          textoInput = '';
        }
      }

      for (let i = 0; i < arrA.length; i++) {
        if (textoInput == arrA.charAt(i)) {
          textoInput = 'a';
        }
      }

      for (let i = 0; i < arrE.length; i++) {
        if (textoInput == arrE.charAt(i)) {
          textoInput = 'e';
        }
      }

      for (let i = 0; i < arrI.length; i++) {
        if (textoInput == arrI.charAt(i)) {
          textoInput = 'i';
        }
      }

      for (let i = 0; i < arrO.length; i++) {
        if (textoInput == arrO.charAt(i)) {
          textoInput = 'o';
        }
      }

      for (let i = 0; i < arrU.length; i++) {
        if (textoInput == arrU.charAt(i)) {
          textoInput = 'u';
        }
      }

      return textoInput;
    }



}
