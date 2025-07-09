import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { ActivatedRoute } from '@angular/router';
import { SuperheroService } from '../../core/services/superhero.service';
import { SuperheroCardComponent } from '../../superheroes/components/superhero-card/superhero-card.component';
import { UniverseType } from '../../core/models/superheroe.model';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorComponent } from '../../shared/components/paginator/paginator.component';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MaterialModule, SuperheroCardComponent, PaginatorComponent ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private route = inject(ActivatedRoute);
  private superheroesService = inject(SuperheroService);

  public universe = this.superheroesService.universe;

  public superheroes = this.superheroesService.superheroesReadOnly;
  public searchTerm = signal('');
  public filteredHeroes = this.superheroesService.filteredHeroes;

  public title = computed(() => {
    if(this.universe()){
      return `Superheroes de ${this.universe()}`
    }

    return `Todos los Superheroes`
  });

  public pageIndex = signal(0);
  public pageSize = signal(6);
  public totalFiltered = computed(() => this.superheroesService.filteredHeroes().length);

  public filteredHeroesPaginated = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.superheroesService.filteredHeroes().slice(start, start + this.pageSize());
  });

  ngOnInit(): void {
    this.setUniverse(this.route.snapshot.data['universe'] ?? '')
    
  }

 setUniverse(u: UniverseType) {
    this.superheroesService.setUniverse(u);
    this.pageIndex.set(0);
  }

  onSearch(term:string){
    this.searchTerm.set(term);
    this.superheroesService.setSearchTerm(term);
    this.pageIndex.set(0);
    
  }

  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
