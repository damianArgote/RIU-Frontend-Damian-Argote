import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUpdateSuperHeroComponent } from './create-update-super-hero.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Superhero } from '../../../core/models/superheroe.model';
import { SuperheroService } from '../../../core/services/superhero.service';
import { signal } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { AbstractControl } from '@angular/forms';




describe('CreateUpdateSuperHeroComponent', () => {
    let fixture: ComponentFixture<CreateUpdateSuperHeroComponent>;
    let component: CreateUpdateSuperHeroComponent;

    const heroMock = new Superhero({
        name: 'Spider-Man',
        universe: 'marvel',
        alterEgos: ['Peter Parker'],
        powers: ['trepar paredes', 'sentido arácnido'],
        location: 'Nueva York',
        imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg'
    });

    const superheroServiceMock = {
        getById: jasmine.createSpy().and.returnValue(() => heroMock),
        add: jasmine.createSpy(),
        update: jasmine.createSpy(),
    };

    const toastrMock = {
        success: jasmine.createSpy()
    };

    const locationMock = {
        back: jasmine.createSpy()
    };


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CreateUpdateSuperHeroComponent, NoopAnimationsModule],
            providers: [
                { provide: SuperheroService, useValue: superheroServiceMock },
                { provide: ToastrService, useValue: toastrMock },
                { provide: Location, useValue: locationMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (key: string) => key === 'id' ? heroMock.id : null
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CreateUpdateSuperHeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should enter edit mode if there is id in the path', () => {
        expect(component.isEditMode()).toBeTrue();
        expect(component.form.get('name')?.value).toBe('Spider-Man');
        expect(component.form.get('universe')?.disabled).toBeTrue();
    });

    it('should call update and display toast in edit mode', () => {
        component.form.get('name')?.setValue('Nombre editado');
        component.onSubmit();
        expect(superheroServiceMock.update).toHaveBeenCalledWith(heroMock.id, jasmine.any(Object));
        expect(toastrMock.success).toHaveBeenCalledWith('Actualización exitosa');
    });

    it('should reset the form and go back when canceling', () => {
        component.onCancel();
        expect(component.formError).toBeNull();
        expect(locationMock.back).toHaveBeenCalled();
    });

    it('should create a superhero in creation mode', () => {
        const route = TestBed.inject(ActivatedRoute);
        spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);

        fixture = TestBed.createComponent(CreateUpdateSuperHeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.isEditMode()).toBeFalse();
        expect(component.form.get('universe')?.disabled).toBeFalse();

        component.form.setValue({
            name: 'Nuevo Heroe de Prueba',
            universe: 'marvel',
            alterEgos: ['John Smith'],
            powers: ['tecnología', 'vuelo'],
            location: 'EEUU'
        });

        component.onSubmit();

        expect(superheroServiceMock.add).toHaveBeenCalledWith(jasmine.objectContaining({
            name: 'Nuevo Heroe de Prueba',
            universe: 'marvel',
            alterEgos: ['John Smith'],
            powers: ['tecnología', 'vuelo'],
            location: 'EEUU',
            imageUrl: '/marvel-logo.png'
        }));

        expect(toastrMock.success).toHaveBeenCalledWith('Creación exitosa');
        expect(locationMock.back).toHaveBeenCalled();
    });

    it('should have an invalid form if required fields are empty', () => {
        const route = TestBed.inject(ActivatedRoute);
        spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);

        fixture = TestBed.createComponent(CreateUpdateSuperHeroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        component.form.get('name')?.setValue('');
        component.form.get('universe')?.setValue('');
        component.form.get('alterEgos')?.setValue([]);
        component.form.get('powers')?.setValue([]);
        component.form.get('location')?.setValue('');

        Object.values(component.form.controls).forEach(control => control.updateValueAndValidity());
        fixture.detectChanges();
        expect(component.form.invalid).toBeTrue();
    });

    it('should NOT add the item if the value is empty', () => {
        const mockEvent = {
            value: '   ',
            chipInput: {
                clear: jasmine.createSpy()
            }
        } as unknown as MatChipInputEvent;

        component.form.get('powers')?.setValue(['fuerza']);

        component.addItem(mockEvent, 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual(['fuerza']);
        expect(component.form.get('powers')?.touched).toBeFalse();
        expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should NOT add the item if the array has reached maxMatChip limit', () => {
        const mockEvent = {
            value: 'Nuevo Poder',
            chipInput: {
                clear: jasmine.createSpy()
            }
        } as unknown as MatChipInputEvent;

        component.form.get('powers')?.setValue(['1', '2', '3', '4', '5']);

        component.addItem(mockEvent, 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual(['1', '2', '3', '4', '5']);
        expect(component.form.get('powers')?.touched).toBeFalse();
        expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should add the item if value is valid and under maxMatChip limit', () => {
        const mockEvent = {
            value: 'Nuevo Poder',
            chipInput: {
                clear: jasmine.createSpy()
            }
        } as unknown as MatChipInputEvent;

        component.form.get('powers')?.setValue(['fuerza']);

        component.addItem(mockEvent, 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual(['fuerza', 'Nuevo Poder']);
        expect(component.form.get('powers')?.touched).toBeTrue();
        expect(mockEvent.chipInput.clear).toHaveBeenCalled();
    });

    it('should remove the item from the array if it exists', () => {
        component.form.get('powers')?.setValue(['vuelo', 'fuerza', 'velocidad']);

        component.removeItem('fuerza', 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual(['vuelo', 'velocidad']);
    });

    it('should NOT change the array if the item does not exist', () => {
        component.form.get('powers')?.setValue(['vuelo', 'fuerza']);

        component.removeItem('invisibilidad', 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual(['vuelo', 'fuerza']);
    });

    it('should set an empty array if the only item is removed', () => {
        component.form.get('powers')?.setValue(['fuerza']);

        component.removeItem('fuerza', 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual([]);
    });

    it('should handle empty array gracefully', () => {
        component.form.get('powers')?.setValue([]);

        component.removeItem('fuerza', 'powers');

        const powers = component.form.get('powers')?.value;
        expect(powers).toEqual([]);
    });

    it('should return minLengthArray error if array length is less than min', () => {
        const validator = component.arrayLengthValidator(2, 5);
        const control = { value: ['item1'] } as AbstractControl;

        const result = validator(control);

        expect(result).toEqual({ minLengthArray: { required: 2, actual: 1 } });
    });

    it('should return maxLengthArray error if array length is greater than max', () => {
        const validator = component.arrayLengthValidator(1, 3);
        const control = { value: ['a', 'b', 'c', 'd'] } as AbstractControl;

        const result = validator(control);

        expect(result).toEqual({ maxLengthArray: { allowed: 3, actual: 4 } });
    });

    it('should return null if array length is within min and max limits', () => {
        const validator = component.arrayLengthValidator(1, 3);
        const control = { value: ['item1', 'item2'] } as AbstractControl;

        const result = validator(control);

        expect(result).toBeNull();
    });

    it('should return minLengthArray error if control value is undefined', () => {
        const validator = component.arrayLengthValidator(1, 3);
        const control = { value: undefined } as AbstractControl;

        const result = validator(control);

        expect(result).toEqual({ minLengthArray: { required: 1, actual: 0 } });
    });

    it('should return null if array length is within allowed range (does not trigger any if)', () => {
        const validator = component.arrayLengthValidator(1, 3);
        const control = { value: ['item1', 'item2'] } as AbstractControl;

        const result = validator(control);

        expect(result).toBeNull();
    });

    it('should return null if array length is exactly min or max', () => {
        const validator = component.arrayLengthValidator(2, 4);

        const controlMin = { value: ['a', 'b'] } as AbstractControl;
        const controlMax = { value: ['a', 'b', 'c', 'd'] } as AbstractControl;

        expect(validator(controlMin)).toBeNull();
        expect(validator(controlMax)).toBeNull();
    });

    
});

describe('when superhero does not exist in edit mode', () => {
    beforeEach(() => {
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            imports: [CreateUpdateSuperHeroComponent, NoopAnimationsModule],
            providers: [
                { provide: SuperheroService, useValue: { getById: jasmine.createSpy().and.returnValue(signal(undefined)) } },
                { provide: ToastrService, useValue: { success: jasmine.createSpy() } },
                { provide: Location, useValue: { back: jasmine.createSpy() } },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: (key: string) => key === 'id' ? '123' : null
                            }
                        }
                    }
                }
            ]
        }).compileComponents();
    });

    it('should set formError if superhero is not found in edit mode', () => {
        const fixture = TestBed.createComponent(CreateUpdateSuperHeroComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component.formError).toBe('El superhéroe no fue encontrado.');
    });
});