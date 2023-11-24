import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GymPage } from './gym.page';

const routes: Routes = [
  {
    path: '',
    component: GymPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymPageRoutingModule {}
