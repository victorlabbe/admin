import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntensidadPageRoutingModule } from './intensidad-routing.module';

import { IntensidadPage } from './intensidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntensidadPageRoutingModule
  ],
  declarations: [IntensidadPage]
})
export class IntensidadPageModule {}
