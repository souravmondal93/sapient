import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, MatIconModule, MatInputModule, MatTooltipModule, MatAutocompleteModule, MatPaginatorModule } from '@angular/material';

import { LayoutComponent } from './layout.component';
import { ViewsModule } from '../views/views.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,

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
