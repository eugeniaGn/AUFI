import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ConexionService } from '../services/conexion.service';
import { Prenda } from 'src/interfaces/prenda.interface';
import { Accesorio } from 'src/interfaces/accesorio.interface';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.scss'],
})
export class AgregarPrendaComponent {

  loading = false;
  isPrenda = true;
  hasSubtipos = false;
  hasCaracs = false;
  keyword = 'name';
  tipos = [{}];
  subtipos?: any;
  caracs?: any;
  climas?: any;
  estilos = [{}];
  materiales = [{}];
  colores: any = [{}];
  marcas = [{}];
  prendas: Prenda[] = [];
  accesorios: Accesorio[] = [];
  prenda: Prenda = {};
  accesorio: Accesorio = {}

  constructor(public photoService: PhotoService, private conx: ConexionService) {
    this.conx.get('categoria', 'getClimas').subscribe((data: any) => {
      if (data) this.climas = data;
    });
    this.conx.get('categoria', 'getTipos').subscribe((data: any) => {
      if (data) {
        this.tipos = data;
      }
    })
    this.conx.get('categoria', 'getEstilos').subscribe((data: any) => {
      if (data) {
        this.estilos = data;
      }
    })
    this.conx.get('categoria', 'getMateriales').subscribe((data: any) => {
      if (data) {
        this.materiales = data;
      }
    })
    this.conx.get('categoria', 'getColores').subscribe((data: any) => {
      if (data) {
        this.colores = data;
        console.log(this.colores);
      }
    })
    this.conx.get('categoria', 'getMarcas').subscribe((data: any) => {
      if (data) {
        this.marcas = data;
      }
    })
  }

  async takePhoto() {
    await this.photoService.takeNewPhoto();
  }

  contextToggle() {
    this.isPrenda = !this.isPrenda;
  }

  guardar() {
    this.loading = true;
    if (this.prendas.length == 0) {
      this.agregarPrenda();
    }
    this.prendas.forEach(prenda => {
      this.conx.post('prenda', 'insertPrenda', prenda).subscribe((data: any) => {
        if (!data.estatus) alert('No se pudo agregar una prenda');
        this.prendas = [];
      })
    });

    if (this.accesorios.length == 0) {
      this.agregarAccesorio();
    }
    this.accesorios.forEach(accesorio => {
      this.conx.post('accesorio', 'insertAccesorio', accesorio).subscribe((data: any) => {
        if (!data.estatus) alert('No se pudo agregar un accesorio');
        this.accesorios = [];
        this.loading = false;
      })
    });
  }

  agregarPrenda() {
    if (Object.keys(this.prenda).length > 0) {
      this.prenda.imagen = this.photoService.editedPhotoURL;
      this.prendas.push(this.prenda);
      this.photoService.photoURL = '';
      this.photoService.editedPhotoURL = '';
      this.photoService.base64Data = '';
      this.prenda = {};
    }
  }

  agregarAccesorio() {
    if (Object.keys(this.accesorio).length > 0) {
      this.accesorio.imagen = this.photoService.editedPhotoURL;
      this.accesorios.push(this.accesorio);
      this.photoService.photoURL = '';
      this.photoService.editedPhotoURL = '';
      this.photoService.base64Data = '';
      this.accesorio = {};
    }
  }

  tipoSelectEvent(item: any) {
    // do something with selected item
    this.subtipos = [{}];
    this.conx.post('categoria', 'getSubtipos', {idTipo: item.id}).subscribe((data: any) => {
      if (data.length > 0) {
        this.subtipos = data;
        this.hasSubtipos = true;
      } else this.hasSubtipos = false;
    })
    if (this.isPrenda) this.prenda.tipo = item.id;
    else this.accesorio.tipo = item.id;
  }

  subtipoSelectEvent(item: any) {
    this.caracs = [{}];
    this.conx.post('categoria', 'getCaracteristicas', {idSubtipo: item.id}).subscribe((data: any) => {
      if (data.length > 0) {
        this.caracs = data;
        this.hasCaracs = true;
      } else this.hasCaracs = false;
    })
    if (this.isPrenda) this.prenda.subtipo = item.id;
    else this.accesorio.subtipo = item.id;
  }

  caracSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.carac = item.id;
    else this.accesorio.carac = item.id;
  }

  materialSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.material = item.id;
    else this.accesorio.material = item.id;
  }

  colorSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.color = item.id;
    else this.accesorio.color = item.id;
  }

  estiloSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.estilo = item.id;
    else this.accesorio.estilo = item.id;
  }

  selectClima(clima: any) {
    this.prenda.clima = clima.idClima;
  }

  marcaSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.marca = item.id;
    else this.accesorio.marca = item.id;
  }

}
