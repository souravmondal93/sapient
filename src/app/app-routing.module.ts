import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutRoutingModule } from './layout/layout-routing.module'

export const appRoutes: Routes = [
  ...LayoutRoutingModule
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
      // appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})

export class AppRoutingModule {}
