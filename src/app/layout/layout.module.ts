import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatIconModule, MatInputModule } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { ViewsModule } from '../views/views.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,

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
