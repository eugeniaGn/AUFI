import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-dialog-elegir-prenda',
  templateUrl: './dialog-elegir-prenda.component.html',
  styleUrls: ['./dialog-elegir-prenda.component.scss'],
})
export class DialogElegirPrendaComponent  implements OnInit {
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

  prendasEstilo: any[] = [];

  filtros: any[] = [];
  hasSubtipos = false;
  hasCaracs = false;
  escribiendo: string = "";
  search = false;

  constructor(
    public dialog: MatDialog,
    private conexion: ConexionService
  ) {
    this.funcion_asyncrona();
  }

  async funcion_asyncrona(){
    // this.loading = true;
    await this.obtenerUsuario();
    await this.obtenerPrendas();
    await this.obtenerTipos();
    await this.obtenerEstilos();
    await this.obtenerMateriales();
    await this.obtenerColores();
    await this.obtenerMarcas();
    await this.obtenerClimas();
  }

  async obtenerUsuario() {
    this.conexion.get('usuario', 'traerUsuarioxid').subscribe((data: any) => {
      if (data) {
        this.userName = data.nombresUsuario.split(' ', 1)[0];
      } else {
        alert('No pudimos obtener tu información de usuario.');
      }
    })
  }

  ngOnInit() {}

  async obtenerClimas() {
    this.conexion.get('categoria', 'getClimas').subscribe((dato: any) => {
      this.climas = dato;
      this.filtros.push({ "nombre": "Clima", "activo": false, "contenido": this.climas });
    });
  }

  async obtenerMarcas() {
    this.conexion.get('categoria', 'getMarcas').subscribe((dato: any) => {
      this.marcas = dato;
      this.filtros.push({ "nombre": "Marca", "activo": false, "contenido": this.marcas })
    });
  }

  async obtenerColores() {
    this.conexion.get('categoria', 'getColores').subscribe((dato: any) => {
      this.colores = dato;
      this.filtros.push({ "nombre": "Color", "activo": false, "contenido": this.colores })
    });
  }

  async obtenerMateriales() {
    this.conexion.get('categoria', 'getMateriales').subscribe((dato: any) => {
      this.materiales = dato;
      this.filtros.push({ "nombre": "Material", "activo": false, "contenido": this.materiales })
    });
  }

  async obtenerEstilos() {
    this.conexion.get('categoria', 'getEstilos').subscribe((dato: any) => {
      this.estilos = dato;
      this.filtros.push({ "nombre": "Estilo", "activo": false, "contenido": this.estilos });
      this.obtenerPrendaEstilo();
    });
  }

  async obtenerTipos() {
    this.conexion.get('categoria', 'getTipos').subscribe((dato: any) => {
      this.tipos = dato;
      this.filtros.push({"nombre": "Tipo", "activo": false, "contenido": this.tipos })
      this.filtros.push({ "nombre": "Subtipo", "activo": false, "contenido": this.subtipos })
      this.filtros.push({ "nombre": "Detalle", "activo": false, "contenido": this.caracteristicas })
    });
  }

  async obtenerPrendas() {
    this.conexion.get('prenda', 'getPrendas').subscribe((data: any) => {
      this.prendas = data;
      this.prendasFiltradas = data;
    });
    this.obtenerAccesorios();
  }

  async obtenerAccesorios() {
    this.conexion.get('accesorio', 'getAccesorios').subscribe((dato: any) => {
      dato.forEach((accesorio: any) =>{
        this.prendas.push(accesorio);
      });
    });
  }

  async obtenerPrendaEstilo() {
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


}
