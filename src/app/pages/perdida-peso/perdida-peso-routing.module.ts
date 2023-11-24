import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerdidaPesoPage } from './perdida-peso.page';

const routes: Routes = [
  {
    path: '',
    component: PerdidaPesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerdidaPesoPageRoutingModule {}
