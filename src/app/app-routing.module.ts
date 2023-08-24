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
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, },
  {path: 'crearOutfit', component: CrearOutfitComponent, },
  {path: 'estiloRapido', component: EstiloRapidoComponent, },
  {path: 'agregarPrenda', component: AgregarPrendaComponent},
  {path: 'colecciones', component: ColeccionesComponent, },
  {path: 'registro', component: RegistroComponent, },
  {path: 'perfil', component: PerfilUsuarioComponent, },
  {path: 'update/:id', component: UpdateComponent, },
  {path: 'login', component: LoginComponent, },
  {path: 'coleccion/:name/:id', component: ColeccionComponent, },
  {path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
