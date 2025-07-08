import { computed, Injectable, signal } from '@angular/core';
import { Superhero, SuperheroProps, UniverseType } from '../models/superheroe.model';
import { SUPERHEROES } from '../data/superheroes.data';
import {throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  private superheroes = signal<Superhero[]>([...SUPERHEROES]);

  getAll(universe?: UniverseType){
    if(!universe) return this.superheroes.asReadonly();
    
    return computed(() => 
    this.superheroes().filter(hero => hero.universe === universe));
  }


  getById(id:string){
    return computed(() => this.superheroes().find(h => h.id === id)) ;
  }


  add(heroData: SuperheroProps){
    const newHero = new Superhero(heroData);

    const validate = this.superheroes().some(h => h.id === newHero.id);

    if(validate){
      throw new Error(`There is already a superhero with ID: ${newHero.id}`);
    }

    this.superheroes.update(current => [...current,newHero]);

  }

  update(id:string, updateData: Partial<SuperheroProps>){
    const index = this.superheroes().findIndex(h => h.id === id);

    if(index === -1){
     throw new Error(`Superhero with ID: ${id} not found`)
    }

    const current = this.superheroes()[index];
    const updateHero = new Superhero({
      ...current,
      ...updateData,
      id:current.id
    });

    this.superheroes.update(heroes => {
      const copy = [...heroes];
      copy[index] = updateHero;
      return copy;
    });
  }

  delete(id:string){
    const exists = this.superheroes().some(h => h.id === id);

    if(!exists){
      throw new Error(`Superhero with ID: ${id} not found`)

    }

    this.superheroes.update(current => current.filter(h => h.id !== id));
  }
}
