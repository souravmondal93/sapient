import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule, MatGridListModule, MatButtonModule, MatChipsModule, MatIconModule, MatTooltipModule } from '@angular/material';

import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [
    HomepageComponent
  ]
})
export class ViewsModule { }
