import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearOutfitComponent } from './crear-outfit/crear-outfit.component';
import { EstiloRapidoComponent } from './estilo-rapido/estilo-rapido.component';
import { AgregarPrendaComponent } from './agregar-prenda/agregar-prenda.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, },
  {path: 'crearOutfit', component: CrearOutfitComponent, },
  {path: 'estiloRapido', component: EstiloRapidoComponent, },
  {path: 'agregarPrenda', component: AgregarPrendaComponent},
  {path: 'registro', component: RegistroComponent, },
  {path: 'login', component: LoginComponent, },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
