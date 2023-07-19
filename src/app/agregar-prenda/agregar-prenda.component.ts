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
        data.forEach((tipo: any) => {
          this.tipos.push({id: tipo.idTipo, name: tipo.nombreTipo});
        });
      }
    })
    this.conx.get('categoria', 'getEstilos').subscribe((data: any) => {
      if (data) {
        data.forEach((estilo: any) => {
          this.estilos.push({id: estilo.idEstilo, name: estilo.nombreEstilo})
        });
      }
    })
    this.conx.get('categoria', 'getMateriales').subscribe((data: any) => {
      if (data) {
        data.forEach((material: any) => {
          this.materiales.push({id: material.idMaterial, name: material.nombreMaterial})
        });
      }
    })
    this.conx.get('categoria', 'getColores').subscribe((data: any) => {
      if (data) {
        data.forEach((color: any) => {
          this.colores.push(color)
        });
      }
    })
    this.conx.get('categoria', 'getMarcas').subscribe((data: any) => {
      if (data) {
        data.forEach((marca: any) => {
          this.marcas.push({id: marca.idMarca, name: marca.nombreMarca})
        });
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
        data.forEach((subtipo: any) => {
          this.subtipos.push({id: subtipo.idSubtipo, name: subtipo.nombreSubtipo});
        });
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
        data.forEach((carac: any) => {
          this.caracs.push({id: carac.idCaracteristica, name: carac.nombreCaracteristica});
        });
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
    if (this.isPrenda) this.prenda.color = item.idColor;
    else this.accesorio.color = item.idColor;
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
