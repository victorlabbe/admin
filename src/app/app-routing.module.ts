import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule), canActivate:[NoAuthGuard]
  },
  {
    path: 'forgot-pass',
    loadChildren: () => import('./pages/forgot-pass/forgot-pass.module').then( m => m.ForgotPassPageModule),canActivate:[NoAuthGuard]
  },
   
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule),canActivate: [AuthGuard]
  },
  
  {
    path: 'dietas',
    loadChildren: () => import('./pages/dietas/dietas.module').then( m => m.DietasPageModule),canActivate:[AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'gym',
    loadChildren: () => import('./pages/gym/gym.module').then( m => m.GymPageModule)
  },  {
    path: 'resistencia',
    loadChildren: () => import('./pages/resistencia/resistencia.module').then( m => m.ResistenciaPageModule)
  },
  {
    path: 'cardiovascular',
    loadChildren: () => import('./pages/cardiovascular/cardiovascular.module').then( m => m.CardiovascularPageModule)
  },
  {
    path: 'intensidad',
    loadChildren: () => import('./pages/intensidad/intensidad.module').then( m => m.IntensidadPageModule)
  },
  {
    path: 'perdida-peso',
    loadChildren: () => import('./pages/perdida-peso/perdida-peso.module').then( m => m.PerdidaPesoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
