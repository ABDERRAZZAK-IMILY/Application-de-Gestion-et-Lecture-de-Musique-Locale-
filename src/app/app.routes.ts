import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'labrary',
    loadComponent: () => import('./pages/labrary/labrary').then(m => m.Labrary)
    },
    {
        path: 'track',
        loadComponent: () => import('./pages/track/track').then(a => a.Track)
    }

];
