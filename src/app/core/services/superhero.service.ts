import { computed, Injectable, signal } from '@angular/core';
import { Superhero, SuperheroProps, UniverseType } from '../models/superheroe.model';
import { SUPERHEROES } from '../data/superheroes.data';

import { WithLoading } from '../decorators/with-loading.decorator';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private superheroes = signal<Superhero[]>([...SUPERHEROES]);
  private searchTerm = signal('');
  public readonly searchTermReadOnly = this.searchTerm.asReadonly();
  private _universe = signal<UniverseType | undefined>(undefined);
  public universe = this._universe.asReadonly();
  public readonly superheroesReadOnly = this.superheroes.asReadonly();
  public filteredHeroes = computed(() => {
    const term = this.normalizeText(this.searchTerm());
    const universe = this._universe();
    return this.superheroes().filter(hero => {
      const nameNormalized = this.normalizeText(hero.name);
      const matchesName = nameNormalized.includes(term);
      const matchesUniverse = universe ? hero.universe === universe : true;
      return matchesName && matchesUniverse;
    });
  });

  constructor(public loadingService: LoadingService) { }


  setUniverse(universe?: UniverseType) {
    this._universe.set(universe);
  }

  @WithLoading()
  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  @WithLoading()
  getAll(universe?: string, pageIndex: number = 0, pageSize: number = 10) {
    if (!universe) {
      return computed(() => {
        const heroes = this.superheroes();
        const start = pageIndex * pageSize

        return heroes.splice(start, start + pageSize);
      })
    }

    return computed(() => {
      const filtered = this.superheroes().filter(hero => hero.universe === universe);
      const start = pageIndex * pageSize;
      return filtered.slice(start, start + pageSize);
    });
  }

  getTotalCount(universe?: string): number {
    if (!universe) return this.superheroes().length;
    return this.superheroes().filter(h => h.universe === universe).length;
  }

  getById(id: string) {
    return computed(() => this.superheroes().find(h => h.id === id));
  }

  @WithLoading()
  add(heroData: SuperheroProps) {
    const newHero = new Superhero(heroData);

    const validate = this.superheroes().some(h => h.id === newHero.id);

    if (validate) {
      throw new Error(`There is already a superhero with ID: ${newHero.id}`);
    }

    this.superheroes.update(current => [...current, newHero]);

  }

  @WithLoading()
  update(id: string, updateData: Partial<SuperheroProps>) {
    const index = this.superheroes().findIndex(h => h.id === id);

    if (index === -1) {
      throw new Error(`Superhero with ID: ${id} not found`)
    }

    const current = this.superheroes()[index];
    const updateHero = new Superhero({
      ...current,
      ...updateData,
      id: current.id
    });

    this.superheroes.update(heroes => {
      const copy = [...heroes];
      copy[index] = updateHero;
      return copy;
    });
  }

  @WithLoading()
  delete(id: string) {
    const exists = this.superheroes().some(h => h.id === id);

    if (!exists) {
      throw new Error(`Superhero with ID: ${id} not found`)

    }

    this.superheroes.update(current => current.filter(h => h.id !== id));
  }


  private normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }
}
