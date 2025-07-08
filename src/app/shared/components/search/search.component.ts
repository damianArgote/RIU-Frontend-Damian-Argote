import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { SuperheroService } from '../../../core/services/superhero.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,MaterialModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  private fb = inject(FormBuilder);
  private superheroService = inject(SuperheroService);
  
  public form = this.fb.group({
    term:['']
  })

  public searchTerm = this.superheroService.searchTermReadOnly;


  onSubmit(){
    if(this.form.invalid) return

    const term = this.form.value.term!.trim();
    this.superheroService.setSearchTerm(term)
  }

  onClear(){
    this.form.get('term')?.setValue('');
    this.superheroService.setSearchTerm('');
  }
}
