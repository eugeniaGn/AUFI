import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearOutfitComponent } from './crear-outfit/crear-outfit.component';
import { EstiloRapidoComponent } from './estilo-rapido/estilo-rapido.component';
import { AgregarPrendaComponent } from './agregar-prenda/agregar-prenda.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ColeccionesComponent } from './colecciones/colecciones.component';
import { ColeccionComponent } from './coleccion/coleccion.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'crearOutfit', component: CrearOutfitComponent, canActivate: [AuthGuard]},
  {path: 'estiloRapido', component: EstiloRapidoComponent, canActivate: [AuthGuard]},
  {path: 'agregarPrenda', component: AgregarPrendaComponent, canActivate: [AuthGuard]},
  {path: 'colecciones', component: ColeccionesComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistroComponent},
  {path: 'login', component: LoginComponent},
  {path: 'coleccion/:name/:id', component: ColeccionComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
