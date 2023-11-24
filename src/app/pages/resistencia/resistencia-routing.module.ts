import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResistenciaPage } from './resistencia.page';

const routes: Routes = [
  {
    path: '',
    component: ResistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResistenciaPageRoutingModule {}
