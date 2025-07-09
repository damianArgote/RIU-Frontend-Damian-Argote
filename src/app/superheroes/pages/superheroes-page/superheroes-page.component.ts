import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SuperheroService } from '../../../core/services/superhero.service';
import { FabButtonComponent } from '../../../shared/components/fab-button/fab-button.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-superheroes-page',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterOutlet, FabButtonComponent],
  templateUrl: './superheroes-page.component.html',
  styleUrl: './superheroes-page.component.scss'
})
export class SuperheroesPageComponent {
  private router = inject(Router)
  private superHeroesService = inject(SuperheroService);
  public currentPath = signal(this.router.url);

  public universe = signal<string>('');
  public searchTerm = signal('');

  public showFabAndSearch = signal(false);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentPath.set(event.urlAfterRedirects);

        const path = event.urlAfterRedirects;
        this.showFabAndSearch.set(['/all', '/dc', '/marvel'].some(p => path.includes(p)));

        if (path.includes('marvel')) {
          this.universe.set('marvel')
        } else if (path.includes('dc')) {
          this.universe.set('dc')
        } else {
          this.universe.set('')
        }
      })
  }
  public superheroes = this.superHeroesService.getAll(this.universe());
  onSearch(term: string) {
    this.searchTerm.set(term);

  }
}
