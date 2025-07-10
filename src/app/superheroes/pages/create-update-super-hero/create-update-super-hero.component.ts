import { Component, computed, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormControl, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { SuperheroService } from '../../../core/services/superhero.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';
import { UppercaseDirective } from '../../../core/directives/uppercase.directive';


@Component({
  selector: 'app-create-update-super-hero',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, FormErrorComponent, UppercaseDirective],
  templateUrl: './create-update-super-hero.component.html',
  styleUrl: './create-update-super-hero.component.scss'
})
export class CreateUpdateSuperHeroComponent {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private toast = inject(ToastrService);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  private superheroesService = inject(SuperheroService);
  private fb = inject(FormBuilder);

  public form: FormGroup;
  public formError: string | null = null;

  public readonly id = signal(this.route.snapshot.paramMap.get('id') ?? '');
  public readonly isEditMode = computed(() => !!this.id());

  public readonly hero = computed(() => {
    if (!this.id()) return null;
    return this.superheroesService.getById(this.id())();
  });

  constructor() {

    this.form = this.fb.group({
      name: ['', Validators.required],
      universe: [{ value: 'marvel', disabled: this.isEditMode() }],
      alterEgos: this.fb.control<string[]>([], [this.arrayLengthValidator(1, 5)]),
      powers: this.fb.control<string[]>([], [this.arrayLengthValidator(1, 5)]),
      location: ['', Validators.required]
    })
  }

  ngOnInit() {
    const hero = this.hero();
    if (this.isEditMode() && hero) {
      this.form.patchValue(hero);
      this.form.get('universe')?.disable();
    } else if (this.isEditMode() && !this.hero()) {
      this.formError = 'El superhéroe no fue encontrado.';
    }

  }

  get powersControl(): FormControl<string[]> {
    return this.form.get('powers') as FormControl<string[]>;
  }

  get alterEgosControl(): FormControl<string[]> {
    return this.form.get('alterEgos') as FormControl<string[]>;
  }

  get selectedUniverse(): '' | 'marvel' | 'dc' {
    return this.form.get('universe')?.value as '' | 'marvel' | 'dc';
  }

  addItem(event: MatChipInputEvent, field: 'powers' | 'alterEgos') {
    const value = (event.value || '').trim();
    const control = this.form.get(field);
    const current = control?.value as string[];

    if (value && current.length < 3) {
      control?.setValue([...current, value]);
      control?.markAsTouched();
    }

    event.chipInput?.clear();
  }

  removeItem(valueToRemove: string, field: 'powers' | 'alterEgos') {
    const current = this.form.get(field)?.value as string[] || [];
    const updated = current.filter(item => item !== valueToRemove);
    this.form.get(field)?.setValue(updated);
  }

  arrayLengthValidator(min: number, max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string[] || [];

      if (value.length < min) {
        return { minLengthArray: { required: min, actual: value.length } };
      }

      if (value.length > max) {
        return { maxLengthArray: { allowed: max, actual: value.length } };
      }

      return null;
    };
  }


  onSubmit() {
    if (this.form.invalid) return;

    try {
      const value = this.form.getRawValue();


      if (this.isEditMode() && this.id()) {
        this.superheroesService.update(this.id(), value);
        this.toast.success(`Actualización exitosa`);
      } else {
        this.superheroesService.add({ ...value, imageUrl: `/${this.selectedUniverse}-logo.png` });
        this.toast.success(`Creación exitosa`)
      }

      this.formError = null;
      this.form.reset();
      this.location.back();

    } catch (error: any) {
      this.formError = error.message || 'Error al guardar';
    }

  }

  onCancel() {
    this.formError = null;
    this.form.reset();
    this.location.back();
  }
}
