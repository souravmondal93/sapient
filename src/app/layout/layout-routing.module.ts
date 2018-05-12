import { Routes } from '@angular/router';

import { HomepageComponent } from '../views/homepage/homepage.component';

export const LayoutRoutingModule: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: '**', redirectTo: '/homepage', pathMatch: 'full' }
];
