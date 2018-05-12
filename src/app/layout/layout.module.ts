import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { ViewsModule } from '../views/views.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,

    ViewsModule
  ],
  declarations: [
    LayoutComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
