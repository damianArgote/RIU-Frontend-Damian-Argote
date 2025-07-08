import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: 'superheroes',
        loadComponent: () => import('./superheroes/pages/superheroes-page/superheroes-page.component').then(c => c.SuperheroesPageComponent),
        children: [
            {
                path: 'all',
                component: MainLayoutComponent
            },
            {
                path: 'dc',
                component: MainLayoutComponent,
                data: { universe: 'dc' }
            },
            {
                path: 'marvel',
                component: MainLayoutComponent,
                data: { universe: 'marvel' }
            },

            {
                path: '**',
                redirectTo: 'dc',
                pathMatch: 'full'
            }
        ]
    },
    {
        path:'**',
        redirectTo:'superheroes'
    }

];
