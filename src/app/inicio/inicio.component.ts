import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConexionService } from '../services/conexion.service';
import { MatDialog } from '@angular/material/dialog';
import { PrendaComponent } from '../prenda/prenda.component';
import { GestureController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  private currentOffset: number = 0;
  private lastOnStart: number = 0;
  private DOUBLE_CLICK_THRESHOLD: number = 500;
  userName = '';
  estilos: any[] = [];
  materiales: any[] = [];
  colores: any[] = [];
  marcas: any[] = [];
  climas: any[] = [];
  tipos: any[] = [];
  subtipos: any[] = [];
  caracteristicas: any[] = [];
  prendas: any[] = [];
  prendasFiltradas: any[] = [];
  accesorios: any[] = [];

  prendasEstilo: any[] = [];

  filtros: any[] = [];
  hasSubtipos = false;
  caracs?: any;
  hasCaracs = false;

  filtroActivo: boolean = false;
  escribiendo: string = "";
  outfits: any = [];
  loading = false;
  search = false;

  constructor(
    private conexion: ConexionService,
    private router: Router,
    public dialog: MatDialog
  ) {

  }

  onStart(outfit: any) {
    const now = Date.now();
    if (Math.abs(now - this.lastOnStart) <= this.DOUBLE_CLICK_THRESHOLD) {
      this.likeOutfit(outfit);
      this.lastOnStart = 0;
    } else {
      this.lastOnStart = now;
    }

    this.router.navigate(['/estiloRapido']);
  }

  async funcion_asyncrona() {
    this.loading = true;

    await this.obtenerUsuario();

    await this.obtenerPrendas();

    await this.obtenerTipos();

    await this.obtenerMateriales();

    await this.obtenerColores();

    await this.obtenerMarcas();

    await this.obtenerClimas();

    await this.obtenerEstilos();

    await this.obtenerOutfits();
  }


   obtenerUsuario() {
    this.conexion.get('usuario', 'traerUsuarioxid').subscribe((data: any) => {
      if (data) {
        this.userName = data.nombresUsuario.split(' ', 1)[0];
      } else {
        alert('No pudimos obtener tu información de usuario.');
      }
    })
  }

  ngOnInit() {
    this.funcion_asyncrona();
  }

   obtenerClimas() {
    this.conexion.get('categoria', 'getClimas').subscribe((dato: any) => {
      this.climas = dato;
      this.filtros.push({ "nombre": "Clima", "activo": false, "contenido": this.climas });
    });
  }

   obtenerMarcas() {
    this.conexion.get('categoria', 'getMarcas').subscribe((dato: any) => {
      this.marcas = dato;
      this.filtros.push({ "nombre": "Marca", "activo": false, "contenido": this.marcas })
    });
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
  }

   calificarOutfits() {
    this.estilos.forEach((estilo: any) => {

    });
  }

   obtenerColores() {
    this.conexion.get('categoria', 'getColores').subscribe((dato: any) => {
      this.colores = dato;
      this.filtros.push({ "nombre": "Color", "activo": false, "contenido": this.colores })
    });
  }

   obtenerMateriales() {
    this.conexion.get('categoria', 'getMateriales').subscribe((dato: any) => {
      this.materiales = dato;
      this.filtros.push({ "nombre": "Material", "activo": false, "contenido": this.materiales })
    });
  }

   obtenerEstilos() {
    this.conexion.get('categoria', 'getEstilos').subscribe((dato: any) => {
      this.estilos = dato;
      this.filtros.push({ "nombre": "Estilo", "activo": false, "contenido": this.estilos });
      this.obtenerPrendaEstilo();
    });
  }

   obtenerTipos() {
    this.conexion.get('categoria', 'getTipos').subscribe((dato: any) => {
      this.tipos = dato;
      this.filtros.push({"nombre": "Tipo", "activo": false, "contenido": this.tipos })
      this.filtros.push({ "nombre": "Subtipo", "activo": false, "contenido": this.subtipos })
      this.filtros.push({ "nombre": "Detalle", "activo": false, "contenido": this.caracteristicas })
    });
  }

  obtenerPrendas() {

    this.conexion.get('prenda', 'getPrendas').subscribe((data: any)  => {
      console.log(data);
      this.prendas = data;
      this.prendasFiltradas = data;
    });

  }

   obtenerPrendaEstilo() {
    var prendas: any = [];
    this.estilos.forEach((estilo: any) => {
      this.prendas.forEach((prenda: any) => {
        if (prenda.estilo == estilo.name){
          prendas.push(prenda);
        }
      });
      if (prendas.length > 0){
        this.prendasEstilo.push({"estilo": estilo.name,  "arreglo": prendas});
      }
      prendas = [];
    });
  }

  toggleFiltrar(nombreF: string) {
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

  crearOutfit() {
    this.router.navigate(['/crearOutfit']);
  }

  buscando(escribiendo: string, data: any) {
    if (escribiendo == "") {
      for (var i = 0; i < this.filtros.length; i++) {
        this.filtros[i].activo = false;
      }
      return true;
    } else {
      this.buscar(data);
      return false;
    }
  }

  buscar(data: any) {
    const filtroValue = (data.target as HTMLInputElement).value.trim()?.toLowerCase();

    this.prendasFiltradas = this.prendas.filter((prenda: any) => {
      let textoInput: any = '';
      for (let i = 0; i < filtroValue.length; i++) {
        textoInput = textoInput + this.filtro(filtroValue[i]);
      }
        return prenda.tipo.toLowerCase().includes(textoInput) ||
        prenda.color.toLowerCase().includes(textoInput) ||
        prenda.material.toLowerCase().includes(textoInput) ||
        prenda.marca.toLowerCase().includes(textoInput) ||
        prenda.estilo.toLowerCase().includes(textoInput);
    });

  }

  filtro(textoInput: any) {
      let simbolos = new String('#$@%&|^`´*çÇº\º!·/()=');
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
    this.conexion.post('categoria', 'getSubtipos', { idTipo: item.id }).subscribe((data: any) => {
      if (data.length > 0) {
        this.subtipos.splice(0);
        data.forEach((subtipo: any) => {
          this.subtipos.push({ id: subtipo.id, name: subtipo.name });
        });
        this.hasSubtipos = true;
      } else this.hasSubtipos = false;
    })
  }

  subtipoSelectEvent(item: any) {
    this.conexion.post('categoria', 'getCaracteristicas', { idSubtipo: item.id }).subscribe((data: any) => {
      if (data.length > 0) {
        this.caracteristicas.splice(0);
        data.forEach((carac: any) => {
          this.caracteristicas.push({ id: carac.id, name: carac.name });
        });

        this.hasCaracs = true;
      } else this.hasCaracs = false;
    })
  }


  openDialogPrenda(data: any) {
    this.dialog.open(PrendaComponent, { width: '95%', height: '80%', data: { idPrenda: data.idPrenda, tipo: data.tipo, subtipo: data.subtipo, caracteristicas: data.caracteristicas, estilo: data.estilo, material: data.material, color: data.color, marca: data.marca, clima: data.clima, imagenPrenda: data.imagenPrenda, fondo: data.fondo } });
  }

  perfil() {
    this.router.navigate(['perfil'])
  }

  selectFiltro(filtro: any, contenido: any) {
    const obj = {
      tipo: '',
      subtipo: '',
      caracteristicas: '',
      estilo: '',
      clima: '',
      color: '',
      material: '',
      marca: ''
    }
    if (filtro.nombre == 'Tipo') this.tipoSelectEvent(contenido);
    if (filtro.nombre == 'Subtipo') this.subtipoSelectEvent(contenido);
    if (filtro.nombre == 'Color') contenido = contenido.color;
    else contenido = contenido.name;
    type ObjectKey = keyof typeof obj;
    filtro = filtro.nombre.toLowerCase() as keyof ObjectKey;
    this.prendasFiltradas = this.prendasFiltradas.filter((prenda: any) => {
      return prenda[filtro] == contenido;
    })
  }

  closeSearch() {
    this.search = false;
    this.escribiendo = '';
    this.clearFilters();
  }

  clearFilters() {
    this.prendasFiltradas = this.prendas;
    this.subtipos.splice(0);
    this.caracteristicas.splice(0);
  }

  likeOutfit(outfit: any) {
    if (localStorage.getItem('likes') == null) {
      localStorage.setItem('likes', JSON.stringify([]));
    }
    const likes = JSON.parse(localStorage.getItem('likes')!);
    likes.push(outfit);
    localStorage.setItem('likes', JSON.stringify(likes));
  }

}
