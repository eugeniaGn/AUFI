import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  photoURL = '';
  base64Data = '';

  constructor(private http: HttpClient) {
  }

  async takeNewPhoto() {
    await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).then(async (capturedPhoto) => {
      if (capturedPhoto.webPath) {
        this.base64Data = await this.readAsBase64(capturedPhoto);
      }
    }).then(() => {this.removeBg()})
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async removeBg() {
    const httpOptions: Object = {
      headers: new HttpHeaders({
        'X-Api-Key': env.bgRemoveKey,
        'Accept': 'application/json'
      }),
    }
    const formData = new FormData();
    formData.append('image_file_b64', this.base64Data);
    formData.append('size', 'auto');
    formData.append('type', 'product');
    this.http.post('https://api.remove.bg/v1.0/removebg', formData, httpOptions).subscribe((response: any) => {
        this.base64Data = 'data:image/png;base64,' + response.data.result_b64;
    })
  }
  
  uploadPhoto() {
    let data = new FormData();
    data.append('file', this.base64Data);
    data.append('upload_preset', 'aufiTestUser');
    data.append('cloud_name', 'duz7dfwse');
    return new Promise((resolve, reject) => {
      this.http.post('https://api.cloudinary.com/v1_1/duz7dfwse/image/upload/', data).subscribe((response: any) => {
        if (response.url) {
          this.photoURL = response.url;
          resolve(true);
        } else {
          alert("Ocurrio un error al guardar la imagen.");
          reject(false);
        }
      })
    })
  }

}
