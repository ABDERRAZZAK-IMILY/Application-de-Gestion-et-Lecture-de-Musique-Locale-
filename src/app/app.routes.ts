import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '',
    redirectTo: 'library',
    pathMatch: 'full'
  },
  {
    path: 'library',
    loadComponent: () => import('./pages/library/library').then(m => m.Library)
  },
  {
    path: 'track/:id',
    loadComponent: () => import('./pages/track-detail/track-detail').then(m => m.TrackDetail)
  },
  {
    path: 'add',
    loadComponent: () => import('./components/track-form/track-form').then(m => m.TrackFormComponent)
},
];
