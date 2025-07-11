import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUpdateSuperHeroComponent } from './create-update-super-hero.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Superhero } from '../../../core/models/superheroe.model';
import { SuperheroService } from '../../../core/services/superhero.service';




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
            imports: [CreateUpdateSuperHeroComponent,NoopAnimationsModule ],
            providers:[
                { provide: SuperheroService, useValue: superheroServiceMock },
                { provide: ToastrService, useValue: toastrMock },
                { provide: Location, useValue: locationMock },
                {
                    provide: ActivatedRoute,
                    useValue:{
                        snapshot:{
                            paramMap:{
                                get:(key:string) => key === 'id' ? heroMock.id : null
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

    it('should create the component correctly',() => {
        expect(component).toBeTruthy();
    });

    it('should enter edit mode if there is id in the path',() => {
        expect(component.isEditMode()).toBeTrue();
        expect(component.form.get('name')?.value).toBe('Spider-Man');
        expect(component.form.get('universe')?.disabled).toBeTrue();
    });

    it('should not call add/update if the form is invalid',() => {
        component.form.get('name')?.setValue('');
        component.onSubmit();
        expect(superheroServiceMock.add).not.toHaveBeenCalled();
        expect(superheroServiceMock.update).not.toHaveBeenCalled();
    });

    it('should call update and display toast in edit mode',() => {
        component.form.get('name')?.setValue('Nombre editado');
        component.onSubmit();
        expect(superheroServiceMock.update).toHaveBeenCalledWith(heroMock.id, jasmine.any(Object));
        expect(toastrMock.success).toHaveBeenCalledWith('Actualización exitosa');
    });

    it('should reset the form and go back when canceling',() => {
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
})