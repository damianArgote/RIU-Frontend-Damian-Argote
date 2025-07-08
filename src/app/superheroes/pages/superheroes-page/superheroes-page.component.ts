import { Component, computed, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { MainLayoutComponent } from '../../../layouts/main-layout/main-layout.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SuperheroService } from '../../../core/services/superhero.service';

@Component({
  selector: 'app-superheroes-page',
  standalone: true,
  imports: [NavbarComponent, SearchComponent, RouterOutlet],
  templateUrl: './superheroes-page.component.html',
  styleUrl: './superheroes-page.component.scss'
})
export class SuperheroesPageComponent {
  private route = inject(ActivatedRoute);
  private superHeroesService = inject(SuperheroService);

  public universe = this.route.snapshot.data['universe'] ?? ''

  public superheroes = this.superHeroesService.getAll(this.universe);

  public searchTerm = signal('');

 


  onSearch(term: string) {
    this.searchTerm.set(term);

  }
}
