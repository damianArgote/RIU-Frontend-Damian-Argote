import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorComponent } from './form-error.component';

@Component({
  template: `<app-form-error [control]="controlSignal" fieldName="test" customMessage="custom error"></app-form-error>`
})
class HostComponent {
  controlSignal = signal<FormControl | null>(null);
}

describe('FormErrorComponent with signal input', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;
  let formErrorComponent: FormErrorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent],
      imports: [FormErrorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();

    formErrorComponent = fixture.debugElement.children[0].componentInstance;
  });

  it('should create', () => {
    expect(formErrorComponent).toBeTruthy();
  });

  it('should return false if control is null', () => {
    host.controlSignal.set(null);
    fixture.detectChanges();
    expect(formErrorComponent.hasError()).toBeFalse();
  });

  it('should return false if control is valid and touched', () => {
    const control = new FormControl('valid', Validators.required);
    control.markAsTouched();

    host.controlSignal.set(control);
    fixture.detectChanges();

    expect(formErrorComponent.hasError()).toBeFalse();
  });

  it('should return false if control is invalid but not touched', () => {
    const control = new FormControl('', Validators.required);

    host.controlSignal.set(control);
    fixture.detectChanges();

    expect(formErrorComponent.hasError()).toBeFalse();
  });
});