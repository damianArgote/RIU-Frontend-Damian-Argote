import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FabButtonComponent } from './fab-button.component';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

describe('FabButtonComponent', () => {
  let component: FabButtonComponent;
  let fixture: ComponentFixture<FabButtonComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabButtonComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(FabButtonComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /superheroes/new when goToNew is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToNew();
    expect(navigateSpy).toHaveBeenCalledWith(['/superheroes/new']);
  });
});