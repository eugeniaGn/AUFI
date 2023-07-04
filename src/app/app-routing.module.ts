import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearOutfitComponent } from './crear-outfit/crear-outfit.component';
import { EstiloRapidoComponent } from './estilo-rapido/estilo-rapido.component';

const routes: Routes = [
  {path: 'inicio', component: InicioComponent, },
  {path: 'crearOutfit', component: CrearOutfitComponent, },
  {path: 'estiloRapido', component: EstiloRapidoComponent, },

  {
    path: '**',
    redirectTo: 'inicio',
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
