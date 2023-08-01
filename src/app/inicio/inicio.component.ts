import { AppComponent } from './../app.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { PrendaComponent } from '../prenda/prenda.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent  implements OnInit {
  estilos : any[] = [];
  materiales : any[] = [];
  colores : any[] = [];
  marcas : any[] = [];
  climas : any[] = [];
  tipos : any[] = [];
  subtipos : any[] = [];
  caracteristicas : any[] = [];
  prendas: any[] = [];
  prendasFiltradas : any [] = [];
  accesorios : any[] = [];

  prendasEstilo: any[] = [];

  filtros : any[] = [];
  hasSubtipos = false;
  caracs?: any;
  hasCaracs = false;

  filtroActivo:boolean = false;
  escribiendo:string = "";

  constructor(
    private conexion: ConexionService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.obtenerPrendas();
    this.obtenerTipos();
    this.obtenerEstilos();
    this.obtenerMateriales();
    this.obtenerColores();
    this.obtenerMarcas();
    this.obtenerClimas();
  }

  ngOnInit() {}

  obtenerPrendaEstilo() {
    var prendas: any = [];
    this.estilos.forEach((estilo: any) => {
      this.prendas.forEach((prenda: any) => {
        if (prenda.estilo == estilo.name){
          prendas.push(prenda);
        }
      });
      if(prendas.length > 0){
        this.prendasEstilo.push({"estilo": estilo.name,  "arreglo": prendas});
      }
      prendas = [];
    });
    console.log(this.prendasEstilo);
  }

  obtenerClimas() {
    this.conexion.get('categoria', 'getClimas').subscribe((dato: any) => {
      this.climas = dato;
      this.filtros.push({"nombre":"Clima", "activo": false, "contenido": this.climas })
      // console.log(dato);
    });
  }

  obtenerMarcas() {
    this.conexion.get('categoria', 'getMarcas').subscribe((dato: any) => {
      this.marcas = dato;
      this.filtros.push({"nombre":"Marca", "activo": false, "contenido": this.marcas })
      // console.log(dato);
    });
  }

  obtenerColores() {
    this.conexion.get('categoria', 'getColores').subscribe((dato: any) => {
      this.colores = dato;
      this.filtros.push({"nombre":"Color", "activo": false, "contenido": this.colores })
      // console.log(dato);
    });
  }

  obtenerMateriales() {
    this.conexion.get('categoria', 'getMateriales').subscribe((dato: any) => {
      this.materiales = dato;
      this.filtros.push({"nombre":"Material", "activo": false, "contenido": this.materiales })
      // console.log(dato);
    });
  }

  obtenerEstilos() {
    this.conexion.get('categoria', 'getEstilos').subscribe((dato: any) => {
      this.estilos = dato;
      this.filtros.push({"nombre":"Estilo", "activo": false, "contenido": this.estilos });
      // console.log(dato);
      this.obtenerPrendaEstilo();
    });
  }

  obtenerTipos() {
    this.conexion.get('categoria', 'getTipos').subscribe((dato: any) => {
      this.tipos = dato;
      this.filtros.push({"nombre":"Tipo", "activo": false, "contenido": this.tipos })
      // console.log(dato);
    });
  }

  obtenerPrendas() {
    this.conexion.get('prenda', 'getPrendas').subscribe((dato: any) => {
      this.prendas = dato;
      console.log(this.prendas);
    });
  }

  obtenerAccesorios() {
    this.conexion.get('accesorio', 'getAccesorios').subscribe((dato: any) => {
      this.prendas.push(dato);
    });
  }

  toggleFiltrar(nombreF:string) {
    switch (nombreF) {
      case "Tipo":
        this.filtros[0].activo = !this.filtros[0].activo;
        break;
      case "Estilo":
        this.filtros[1].activo = !this.filtros[1].activo;
        break;
      case "Material":
        this.filtros[2].activo = !this.filtros[2].activo;
        break;
      case "Color":
        this.filtros[3].activo = !this.filtros[3].activo;
        break;
      case "Marca":
        this.filtros[4].activo = !this.filtros[4].activo;
          break;
      case "Clima":
        this.filtros[5].activo = !this.filtros[5].activo;
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
      this.buscar(data);
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
        let busqueda: any = false;
        if (!prenda.subtipo) {
          busqueda = prenda.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
          prenda.clima.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
          prenda.color.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
          prenda.material.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
          prenda.marca.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
          prenda.estilo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput);
        } else {
          if (!prenda.caracteristicas) {
            busqueda = prenda.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.clima.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.subtipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.color.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.material.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.marca.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.estilo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput);
          } else {
            busqueda = prenda.tipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.subtipo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.caracteristicas.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.clima.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.color.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.material.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.marca.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput) ||
            prenda.estilo.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().includes(textoInput);
          }
        }
        return busqueda;
      });

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
      this.prendasFiltradas.filter((prenda: any) => {
        return prenda.tipo == item.nombreTipo;
      })
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
      this.prendasFiltradas.filter((prenda: any) => {
        return prenda.subtipo == item.nombreSubtipo;
      })
    }


  openDialogPrenda(data: any) {
    let dialogRef = this.dialog.open(PrendaComponent, { width: '95%', height: '80%', data: { idPrenda: data.idPrenda, tipo: data.tipo, subtipo:data.subtipo, caracteristicas:data.caracteristicas, estilo: data.estilo, material: data.material, color: data.color, marca: data.marca, clima: data.clima, imagenPrenda: data.imagenPrenda, fondo: data.fondo } });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}
