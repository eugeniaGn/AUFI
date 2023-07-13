import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-prenda',
  templateUrl: './agregar-prenda.component.html',
  styleUrls: ['./agregar-prenda.component.scss'],
})
export class AgregarPrendaComponent  implements OnInit {

  localPhoto?: any = '';

  constructor(public photoService: PhotoService) { 
  }
  
  ngOnInit() {
  }

  async takePhoto() {
    await this.photoService.takeNewPhoto();
  }

}
