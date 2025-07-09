import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getTranslatePaginator } from './core/utils/get-translate-paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    { provide: MatPaginatorIntl, useFactory: getTranslatePaginator }
  ]
};
