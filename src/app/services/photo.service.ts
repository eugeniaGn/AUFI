import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  editedPhotoURL = '';
  base64Data = '';
  photoURL = '';

  constructor(private http: HttpClient) {
  }

  async takeNewPhoto() {
    await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    }).then(async (capturedPhoto) => {
      if (capturedPhoto.webPath) {
        this.photoURL = capturedPhoto.webPath;
        this.base64Data = await this.readAsBase64(capturedPhoto);
      }
    }).then(() => {
      this.uploadPhoto();
    })
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

  uploadPhoto() {
    let data = new FormData();
    data.append('file', this.base64Data);
    data.append('upload_preset', 'aufiTestUser');
    data.append('cloud_name', 'duz7dfwse');
    this.http.post('https://api.cloudinary.com/v1_1/duz7dfwse/image/upload/', data).subscribe((response: any) =>{ 
      if (response.url) {
        this.editedPhotoURL = response.eager[0].url;
      } else {
        alert("Ocurrio un error al guardar la imagen.");
      }
    })
  }

}