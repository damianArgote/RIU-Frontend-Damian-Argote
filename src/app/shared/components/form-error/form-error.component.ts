import { Component, computed, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [ReactiveFormsModule, MatError],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {

  control = input<AbstractControl | null>(null)
  fieldName = input<string>('')
  customMessage = input<string>('')

  public readonly hasError = computed(() =>
    this.control instanceof FormControl &&
    this.control.invalid &&
    this.control.touched
  );

}
