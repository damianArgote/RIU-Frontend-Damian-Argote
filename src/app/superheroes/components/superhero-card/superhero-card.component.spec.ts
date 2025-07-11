import { TestBed } from '@angular/core/testing';
import { SuperheroCardComponent } from './superhero-card.component';
import { provideRouter } from '@angular/router';
import {  MatDialogModule } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Superhero } from '../../../core/models/superheroe.model';
import { Router } from '@angular/router';


describe('SuperheroCardComponent',() => {
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
            providers:[provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(SuperheroCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created correctly',() => {
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

    it('should redirect when clicking the edit button',() => {
        

        (component as any).hero = () => heroMock;
        fixture.detectChanges();

        const router = TestBed.inject(Router);
        const navigateSpy = spyOn(router, 'navigate');

        const editButton = fixture.debugElement.queryAll(By.css('button'))[1];
        editButton.triggerEventHandler('click', null);

        expect(navigateSpy).toHaveBeenCalledWith([`/superheroes/edit/${heroMock.id}`]);
    });
})