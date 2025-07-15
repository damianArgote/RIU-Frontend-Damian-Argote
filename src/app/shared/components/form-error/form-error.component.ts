import { Component, computed, effect, input, signal } from '@angular/core';
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

  hasError = signal(false);

  constructor() {
    effect(() => {
      const ctrl = this.control();
      if (ctrl instanceof FormControl) {
        this.hasError.set(ctrl.invalid && ctrl.touched);
      } else {
        this.hasError.set(false);
      }
    }, { allowSignalWrites: true });
  }

}
