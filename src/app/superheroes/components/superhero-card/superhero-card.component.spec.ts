import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SuperheroCardComponent } from './superhero-card.component';
import { provideRouter } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Superhero } from '../../../core/models/superheroe.model';
import { Router } from '@angular/router';
import { SuperheroService } from '../../../core/services/superhero.service';
import { of } from 'rxjs';


describe('SuperheroCardComponent', () => {
    let fixture: ReturnType<typeof TestBed.createComponent<SuperheroCardComponent>>;
    let component: SuperheroCardComponent;

    const heroMock = new Superhero({
        name: 'Spider-Man',
        universe: 'marvel',
        alterEgos: ['Peter Parker'],
        powers: ['trepar paredes', 'sentido arácnido'],
        location: 'Nueva York',
        imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg'
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SuperheroCardComponent,
                MatDialogModule,
                NoopAnimationsModule,
                ToastrModule.forRoot()
            ],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created correctly', () => {
        expect(component).toBeTruthy();
    });

    it("should show the superhero's data", () => {
        (component as any).hero = () => heroMock;
        fixture.detectChanges();

        const title = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
        const subtitle = fixture.debugElement.query(By.css('mat-card-subtitle')).nativeElement;
        const image = fixture.debugElement.query(By.css('img')).nativeElement;
        const chips = fixture.debugElement.queryAll(By.css('mat-chip'));

        expect(title.textContent).toContain(heroMock.name);
        expect(subtitle.textContent).toContain(heroMock.universe);
        expect(image.src).toContain(heroMock.imageUrl);
        expect(chips.length).toBe(heroMock.powers.length);
    });

    it('should redirect when clicking the edit button', () => {


        (component as any).hero = () => heroMock;
        fixture.detectChanges();

        const router = TestBed.inject(Router);
        const navigateSpy = spyOn(router, 'navigate');

        const editButton = fixture.debugElement.queryAll(By.css('button'))[1];
        editButton.triggerEventHandler('click', null);

        expect(navigateSpy).toHaveBeenCalledWith([`/superheroes/edit/${heroMock.id}`]);
    });

    it('should handle hero with missing image and powers', () => {
        const incompleteHero = new Superhero({
            name: 'Sin Imagen',
            universe: 'dc',
            alterEgos: [],
            powers: [],
            location: 'Ciudad',
            imageUrl: ''
        });
        (component as any).hero = () => incompleteHero;
        fixture.detectChanges();

        const image = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(image.src).toContain('');
        const chips = fixture.debugElement.queryAll(By.css('mat-chip'));
        expect(chips.length).toBe(0);
    });

    it('should handle hero with missing alterEgos', () => {
        const hero = new Superhero({
            name: 'Sin AlterEgos',
            universe: 'marvel',
            alterEgos: [],
            powers: ['volar'],
            location: 'Ciudad',
            imageUrl: 'img.jpg'
        });
        (component as any).hero = () => hero;
        fixture.detectChanges();

        const alterEgos = fixture.debugElement.queryAll(By.css('.alter-ego-chip'));
        expect(alterEgos.length).toBe(0);
    });

    it('should display default image if imageUrl is missing', () => {
        const hero = new Superhero({
            name: 'Sin Imagen',
            universe: 'dc',
            alterEgos: ['Clark Kent'],
            powers: ['fuerza'],
            location: 'Ciudad',
            imageUrl: ''
        });
        (component as any).hero = () => hero;
        fixture.detectChanges();

        const image = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(image.src).toBe('http://localhost:9876/');
    });

    it('should not fail if edit button is not present', () => {
        const editButton = fixture.debugElement.query(By.css('.edit-button'));
        expect(editButton).toBeNull();
    });

    it('should show all powers as chips', () => {
        (component as any).hero = () => heroMock;
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('mat-chip'));
        expect(chips.length).toBe(heroMock.powers.length);
        chips.forEach((chip, i) => {
            expect(chip.nativeElement.textContent).toContain(heroMock.powers[i]);
        });
    });

    it('should show default image if imageUrl is null', () => {
        const hero = new Superhero({
            name: 'Sin Imagen',
            universe: 'dc',
            alterEgos: ['Clark Kent'],
            powers: ['fuerza'],
            location: 'Ciudad',
            imageUrl: null as any
        });
        (component as any).hero = () => hero;
        fixture.detectChanges();

        const image = fixture.debugElement.query(By.css('img')).nativeElement;
        expect(image.src).toBe('http://localhost:9876/');
    });

    it('should not render powers chips if powers is undefined', () => {
        const hero = new Superhero({
            name: 'Sin Poderes',
            universe: 'dc',
            alterEgos: ['Clark Kent'],
            powers: undefined as any,
            location: 'Ciudad',
            imageUrl: 'img.jpg'
        });
        (component as any).hero = () => hero;
        fixture.detectChanges();

        const chips = fixture.debugElement.queryAll(By.css('mat-chip'));
        expect(chips.length).toBe(0);
    });

    it('should not render alterEgos chips if alterEgos is undefined', () => {
        const hero = new Superhero({
            name: 'Sin AlterEgos',
            universe: 'marvel',
            alterEgos: undefined as any,
            powers: ['volar'],
            location: 'Ciudad',
            imageUrl: 'img.jpg'
        });
        (component as any).hero = () => hero;
        fixture.detectChanges();

        const alterEgos = fixture.debugElement.queryAll(By.css('.alter-ego-chip'));
        expect(alterEgos.length).toBe(0);
    });

    it('should not fail if hero is null', () => {
        (component as any).hero = () => null;
        fixture.detectChanges();

        const title = fixture.debugElement.query(By.css('mat-card-title'));
        expect(title).toBeNull();
    });

    it('should not delete hero or show toast when not confirmed', () => {
        const dialog = TestBed.inject(MatDialog);
        const toast = TestBed.inject(ToastrService);
        const superheroService = TestBed.inject(SuperheroService);

        spyOn(dialog, 'open').and.returnValue({
            afterClosed: () => ({
                subscribe: (fn: (confirmed: boolean) => void) => fn(false)
            })
        } as any);

        spyOn(superheroService, 'delete').and.stub();
        spyOn(toast, 'success');

        (component as any).openConfirmDialog(heroMock);

        expect(superheroService.delete).not.toHaveBeenCalled();
        expect(toast.success).not.toHaveBeenCalled();
    });

    it('should handle error when delete throws', () => {
        const dialog = TestBed.inject(MatDialog);
        const toast = TestBed.inject(ToastrService);
        const superheroService = TestBed.inject(SuperheroService);

        spyOn(dialog, 'open').and.returnValue({
            afterClosed: () => ({
                subscribe: (fn: (confirmed: boolean) => void) => fn(true)
            })
        } as any);

        spyOn(superheroService, 'delete').and.throwError('Delete error');
        spyOn(toast, 'success');

        expect(() => (component as any).openConfirmDialog(heroMock)).not.toThrow();
        expect(toast.success).not.toHaveBeenCalled();
    });

});


describe('openConfirmDialog try-catch flow simple', () => {
    let fixture: ReturnType<typeof TestBed.createComponent<SuperheroCardComponent>>;
    let component: SuperheroCardComponent;

    const heroMock = new Superhero({
        id: '1',
        name: 'Spider-Man',
        universe: 'marvel',
        alterEgos: ['Peter Parker'],
        powers: ['trepar paredes', 'sentido arácnido'],
        location: 'Nueva York',
        imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg'
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SuperheroCardComponent,
                MatDialogModule,
                NoopAnimationsModule,
            ],
            providers: [
                provideRouter([]),
                {
                    provide: ToastrService,
                    useValue: {
                        success: jasmine.createSpy('success'),
                        error: jasmine.createSpy('error'),
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should enter try block when confirmed', fakeAsync(() => {
        spyOn(component['dialog'], 'open')
            .and.returnValue({ afterClosed: () => of(true) } as any);

        const deleteSpy = spyOn(component['superheroService'], 'delete').and.returnValue(undefined);
        const toastSuccessSpy = component['toast'].success;

        component.openConfirmDialog(heroMock);
        tick();

        expect(deleteSpy).toHaveBeenCalledWith('1');
        expect(toastSuccessSpy).toHaveBeenCalledWith('Se ha eliminado a Spider-Man');
    }));

    it('should enter catch block and call toast.error if delete throws', fakeAsync(() => {
        spyOn(component['dialog'], 'open')
            .and.returnValue({ afterClosed: () => of(true) } as any);

        spyOn(component['superheroService'], 'delete').and.callFake(() => {
            throw new Error('fallo');
        });

        const toastErrorSpy = component['toast'].error;

        component.openConfirmDialog(heroMock);
        tick();

        expect(toastErrorSpy).toHaveBeenCalledWith('Error al eliminar a Spider-Man: Error: fallo');
    }));
});
