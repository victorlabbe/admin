import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntensidadPage } from './intensidad.page';

const routes: Routes = [
  {
    path: '',
    component: IntensidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntensidadPageRoutingModule {}
