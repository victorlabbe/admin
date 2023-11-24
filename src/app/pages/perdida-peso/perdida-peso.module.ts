import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerdidaPesoPageRoutingModule } from './perdida-peso-routing.module';

import { PerdidaPesoPage } from './perdida-peso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerdidaPesoPageRoutingModule
  ],
  declarations: [PerdidaPesoPage]
})
export class PerdidaPesoPageModule {}
