import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalleRoutingModule } from './salle-routing.module';
import { SalleComponent } from './salle.component';

@NgModule({
  declarations: [SalleComponent],
  imports: [
    CommonModule,
    SalleRoutingModule
  ]
})
export class SalleModule { }
