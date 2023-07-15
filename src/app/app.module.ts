import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { CrearOutfitComponent } from './crear-outfit/crear-outfit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.interceptors';
import { AgregarPrendaComponent } from './agregar-prenda/agregar-prenda.component';
import { PhotoService } from './services/photo.service';
import { CloudinaryModule } from '@cloudinary/ng';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { RegistroComponent } from './registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CrearOutfitComponent,
    AgregarPrendaComponent
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    CloudinaryModule,
    AutocompleteLibModule
  ],
  providers: [
    PhotoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Multi:true agrega funcionalidad al provider existente, en vez de sobreescribirlo
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
