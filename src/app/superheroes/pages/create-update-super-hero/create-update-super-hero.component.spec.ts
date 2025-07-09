import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSuperHeroComponent } from './create-update-super-hero.component';

describe('CreateUpdateSuperHeroComponent', () => {
  let component: CreateUpdateSuperHeroComponent;
  let fixture: ComponentFixture<CreateUpdateSuperHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateSuperHeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateSuperHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
