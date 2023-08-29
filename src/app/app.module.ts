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
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PrendaComponent } from './prenda/prenda.component';
import { ColeccionesComponent } from './colecciones/colecciones.component';
import { ColeccionComponent } from './coleccion/coleccion.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UpdateComponent } from './update/update.component';
import { MeGustaComponent } from './me-gusta/me-gusta.component';
import { EditarPrendaComponent } from './editar-prenda/editar-prenda.component';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { DialogElegirPrendaComponent } from './dialog-elegir-prenda/dialog-elegir-prenda.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CrearOutfitComponent,
    AgregarPrendaComponent,
    RegistroComponent,
    LoginComponent,
    ColeccionesComponent,
    ColeccionComponent,
    PrendaComponent,
    PerfilUsuarioComponent,
    UpdateComponent,
    MeGustaComponent,
    EditarPrendaComponent,
    DialogElegirPrendaComponent
  ],
  // entryComponents:[
  //   DialogComponent,
  // ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [
    PhotoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Multi:true agrega funcionalidad al provider existente, en vez de sobreescribirlo
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
