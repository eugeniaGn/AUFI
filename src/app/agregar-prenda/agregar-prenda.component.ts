import { Component, ViewChild } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { ConexionService } from '../services/conexion.service';
import { Prenda } from 'src/interfaces/prenda.interface';
import { Accesorio } from 'src/interfaces/accesorio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpenaiService } from '../services/openai.service';
import { Router } from '@angular/router';

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

  climaActivo: boolean = false;
  climaSeleccionado: any = "Clima";
  colorActivo: boolean = false;
  colorSeleccionado = [{"color": "Color", "fondo": "#F2F2F2"}];

  formularioPrenda: FormGroup = this.fb.group({
    clima: [, [Validators.required]],
    estilo: [, [Validators.required]],
    tipo: [, [Validators.required]],
    subtipo: [],
    carac: [],
    material: [, [Validators.required]],
    imagen: [, ],
    color: [, [Validators.required]],
    marca: [, [Validators.required]],
  });

  @ViewChild('tipo') tipo: any;
  @ViewChild('subtipo') subtipo: any;
  @ViewChild('carac') carac: any;
  @ViewChild('material') material: any;
  @ViewChild('marca') marca: any;
  @ViewChild('estilo') estilo: any;

  constructor(
    public photoService: PhotoService,
    private conx: ConexionService, private gpt: OpenaiService,
    private fb: FormBuilder,
    private router: Router
    ) {
    this.getFormData();
  }

  getFormData() {
    this.loading = true;
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
      }
    })
    this.conx.get('categoria', 'getMarcas').subscribe((data: any) => {
      if (data) {
        this.marcas = data;
        this.loading = false;
      }
    })
  }

  async takePhoto() {
    await this.photoService.takeNewPhoto();
  }

  reset() {
    // DO NOT alter the order of the following functions
    // This clears the ng-autocomplete input fields
    this.tipo.clear();
    this.tipo.close();
    this.estilo.clear();
    this.estilo.close();
    this.marca.clear();
    this.marca.close();
    this.material.clear();
    this.material.close();
    this.subtipo.clear();
    this.subtipo.close();
    this.carac.clear();
    this.carac.close();
    // To clear the reactive form
    this.formularioPrenda.reset();
  }

  async createOutfits() {
    var prompt = '{';
    this.conx.get('prenda', 'getPrendasChat').subscribe((data: any) => {
      if (data) {
        const peticionPrendas = data;
        prompt += '"prendas": ' + JSON.stringify(peticionPrendas);
      }
      this.conx.get('accesorio', 'getAccesoriosChat').subscribe((data: any) => {
        if (data) {
          const peticionAccesorios = data;
          prompt += ', "accesorios": ' + JSON.stringify(peticionAccesorios) + '} ';
          prompt += "Crea outfits completos de cada estilo con las prendas de modo que cumplan normas de color y moda actual. Coloca las combinaciones en formato JSON con únicamente los IDs.";
          console.log(prompt);
          this.gpt.sendPetition(prompt).then((response: any) => {
            console.log(JSON.parse(response));
            this.addOutfits(JSON.parse(response));
          });
        }
        this.loading = false;
      })
    })
  }

  addOutfits(response: JSON) {
    this.conx.post('outfit', 'addOutfits', {response}).subscribe((data: any) => {
      if (data) alert("¡La inteligencia artifical ha creado nuevos outfits para ti!");
      else alert("Ocurrio algún error al crear tus nuevos outfits");
      this.loading = false;
    })
  }

  contextToggle() {
    this.reset();
    this.isPrenda = !this.isPrenda;
    if (!this.isPrenda) {
      this.formularioPrenda.controls['clima'].clearValidators();
    } else {
      this.formularioPrenda.controls['clima'].addValidators(Validators.required);
    }
    this.photoService.photoURL = '';
    this.photoService.base64Data = '';
    this.formularioPrenda.updateValueAndValidity();
  }

  async guardar() {
    this.loading = true;
    this.prendas.forEach(prenda => {
      this.conx.post('prenda', 'insertPrenda', prenda).subscribe((data: any) => {
        if (!data.estatus) alert('No se pudo agregar una prenda');
        this.prendas = [];
      })
    });
    this.accesorios.forEach(accesorio => {
      this.conx.post('accesorio', 'insertAccesorio', accesorio).subscribe((data: any) => {
        if (!data.estatus) alert('No se pudo agregar un accesorio');
        this.accesorios = [];
      }).add(() => {
        this.loading = false;
        this.createOutfits();
      })
    });
  }

  async agregarPrenda() {
    this.loading = true;
    this.photoService.uploadPhoto().then(() => {
      this.formularioPrenda.controls['imagen'].setValue(this.photoService.photoURL);
      this.prendas.push(this.formularioPrenda.value);
      this.photoService.photoURL = '';
      this.photoService.base64Data = '';
      this.reset();
      this.loading = false;
    })
  }

  agregarAccesorio() {
    this.loading = true;
    this.photoService.uploadPhoto().then(() => {
      this.accesorio.imagen = this.photoService.photoURL;
      this.accesorios.push(this.accesorio);
      this.photoService.photoURL = '';
      this.photoService.photoURL = '';
      this.photoService.base64Data = '';
      this.accesorio = {};
      this.formularioPrenda.reset();
      this.loading = false;
    })
  }

  tipoSelectEvent(item: any) {
    this.subtipos = [{}];
    this.conx.post('categoria', 'getSubtipos', {idTipo: item.id}).subscribe((data: any) => {
      if (data.length > 0) {
        this.subtipos = data;
        this.hasSubtipos = true;
      } else this.hasSubtipos = false;
    })
    if (this.isPrenda) {
      this.prenda.tipo = item.id;
      this.formularioPrenda.controls['tipo'].setValue(item.id);
    }
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
    if (this.isPrenda) {
      this.prenda.subtipo = item.id;
      this.formularioPrenda.controls['subtipo'].setValue(item.id);
    }
    else this.accesorio.subtipo = item.id;
  }

  caracSelectEvent(item: any) {
    if (this.isPrenda) {
      this.prenda.carac = item.id;
      this.formularioPrenda.controls['carac'].setValue(item.id);
    }
    else this.accesorio.carac = item.id;
  }

  materialSelectEvent(item: any) {
    if (this.isPrenda) {
      this.prenda.material = item.id;
      this.formularioPrenda.controls['material'].setValue(item.id);
    } else this.accesorio.material = item.id;
  }

  colorSelectEvent(item: any) {
    if (this.isPrenda) this.prenda.color = item.id;
    else this.accesorio.color = item.id;
    this.colorSeleccionado[0].color = item.color;
    this.colorSeleccionado[0].fondo = item.fondo;
    setTimeout(() => {
      this.colorEsActivo();
  }, 200);
  }

  estiloSelectEvent(item: any) {
    if (this.isPrenda) {
      this.prenda.estilo = item.id;
      this.formularioPrenda.controls['estilo'].setValue(item.id);
    } else this.accesorio.estilo = item.id;
  }

  selectClima(clima: any) {
    this.prenda.clima = clima.idClima;
  }

  marcaSelectEvent(item: any) {
    if (this.isPrenda) {
      this.prenda.marca = item.id;
      this.formularioPrenda.controls['marca'].setValue(item.id);
    } else this.accesorio.marca = item.id;
  }

  climaEsActivo(){
    if(this.formularioPrenda.value.clima){
      return this.climas?.find((clima:any) => clima.id == this.formularioPrenda.value.clima)?.name
    }
    return "Clima"
  }

  colorEsActivo(){
    if (this.colorActivo){
      this.colorActivo = !this.colorActivo;
    } else{
      this.colorActivo = !this.colorActivo;
    }
  }

  notValid() {
    return this.formularioPrenda.touched && this.formularioPrenda.invalid;
  }

  goBack() {
    if (this.prendas.length > 0) {
      alert('No has guardado tus prendas. Presiona agregar prenda y luego terminar para guardarlas.');
    } else {
      this.router.navigate(['/inicio']);
    }
  }

}
