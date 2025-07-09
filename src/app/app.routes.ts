import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { CreateUpdateSuperHeroComponent } from './superheroes/pages/create-update-super-hero/create-update-super-hero.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeLayoutComponent
    },
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
                path:'new',
                component:CreateUpdateSuperHeroComponent
            },
            {
                path:'edit/:id',
                component:CreateUpdateSuperHeroComponent
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
        redirectTo:''
    }

];
