import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { ActivatedRoute } from '@angular/router';
import { SuperheroService } from '../../core/services/superhero.service';
import { SuperheroCardComponent } from '../../superheroes/components/superhero-card/superhero-card.component';
import { UniverseType } from '../../core/models/superheroe.model';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MaterialModule, SuperheroCardComponent ],
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


  ngOnInit(): void {
    this.setUniverse(this.route.snapshot.data['universe'] ?? '')
    
  }

 setUniverse(u: UniverseType) {
    this.superheroesService.setUniverse(u);
  }

  onSearch(term:string){
    this.searchTerm.set(term);
    
  }
}
