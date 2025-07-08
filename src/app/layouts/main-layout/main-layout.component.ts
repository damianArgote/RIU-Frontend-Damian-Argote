import { Component, computed, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ActivatedRoute } from '@angular/router';
import { SuperheroService } from '../../core/services/superhero.service';
import { SuperheroCardComponent } from '../../superheroes/components/superhero-card/superhero-card.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent,MaterialModule, SuperheroCardComponent ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  private route = inject(ActivatedRoute);

  private superHeroesService = inject(SuperheroService);

  public universe = this.route.snapshot.data['universe'] ?? ''
  

  public superheroes = this.superHeroesService.getAll(this.universe);

  public title = computed(() => {
    if(this.universe){
      return `Superheroes de ${(this.universe as string).toUpperCase()}`
    }

    return `Todos los Superheroes`
  });



}
