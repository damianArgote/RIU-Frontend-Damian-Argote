import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule, FormControl } from '@angular/forms';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  template: `<input [formControl]="control" appUppercase>`
})
class TestComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let input: HTMLInputElement;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, UppercaseDirective],
      declarations: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });

  it('should transform input value to uppercase on input event', () => {
    input.value = 'abc123';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(input.value).toBe('ABC123');
    expect(component.control.value).toBe('ABC123');
  });

  it('should not fail if NgControl.control is missing', () => {
    const directive = new UppercaseDirective({} as NgControl);
    const event = { target: { value: 'test' } } as any;
    expect(() => directive.onInput(event)).not.toThrow();
  });
});