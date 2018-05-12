import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatGridListModule, MatButtonModule, MatChipsModule, MatIconModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';

import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    HomepageComponent
  ]
})
export class ViewsModule { }
