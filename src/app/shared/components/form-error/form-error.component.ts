import { Component, computed, Input } from '@angular/core';
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
  @Input({ required: true }) control!: AbstractControl | null;
  @Input({ required: true }) fieldName: string = '';
  @Input() customMessage?: string;


  public readonly hasError = computed(() =>
    this.control instanceof FormControl &&
    this.control.invalid &&
    this.control.touched
  );

}
