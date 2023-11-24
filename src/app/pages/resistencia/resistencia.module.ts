import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResistenciaPageRoutingModule } from './resistencia-routing.module';

import { ResistenciaPage } from './resistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResistenciaPageRoutingModule
  ],
  declarations: [ResistenciaPage]
})
export class ResistenciaPageModule {}
