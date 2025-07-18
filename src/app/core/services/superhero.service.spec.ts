import { TestBed } from '@angular/core/testing';
import { SuperheroService } from './superhero.service';
import { SuperheroProps, UniverseType } from '../models/superheroe.model';
import { LoadingService } from './loading.service';


describe('SuperheroService', () => {
  let service: SuperheroService;

  const sample: SuperheroProps = {
    name: 'Batman',
    universe: 'dc',
    alterEgos: ['Bruce Wayne'],
    powers: ['Detective Skills'],
    location: 'Gotham',
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperheroService, LoadingService]
    });
    service = TestBed.inject(SuperheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get total count by universe', () => {
    const total = service.getTotalCount('marvel');
    const allMarvel = service.superheroesReadOnly().filter(h => h.universe === 'marvel');
    expect(total).toBe(allMarvel.length);
  });

  it('should get hero by id', () => {
    const hero = service.superheroesReadOnly()[0];
    const result = service.getById(hero.id!)();
    expect(result?.id).toBe(hero.id);
  });

  it('should return paginated superheroes', async () => {
    const universe: UniverseType = 'marvel';
    const pageIndex = 0;
    const pageSize = 6;
    const computedFn = await service.getAll(universe, pageIndex, pageSize);
    const result = computedFn();

    const expected = service.superheroesReadOnly()
      .filter(h => h.universe === universe)
      .slice(0, pageSize);

    expect(result).toEqual(expected);
  });

  it('should add a new superhero', async () => {
    const newHero: SuperheroProps = {
      id: 'superhero-test-new',
      name: 'Test Hero',
      universe: 'marvel',
      alterEgos: ['Test Ego'],
      powers: ['Testing'],
      location: 'Test City',
      imageUrl: 'http://test.image.url/hero.jpg'
    };

    expect(service.getById(newHero.id!)()).toBeUndefined();

    await service.add(newHero);

    const addedHero = service.getById(newHero.id!)();
    expect(addedHero).toBeTruthy();
    expect(addedHero?.id).toBe(newHero.id);
    expect(addedHero?.name).toBe(newHero.name);
  });

  it('should update an existing superhero', async () => {
    const existingHero = service.superheroesReadOnly()[0];

    const updatedData: Partial<SuperheroProps> = {
      name: 'Updated Name',
      location: 'Updated Location',
    };

    await service.update(existingHero.id!, updatedData);

    const updatedHero = service.getById(existingHero.id!)();
    expect(updatedHero).toBeTruthy();
    expect(updatedHero?.name).toBe('Updated Name');
    expect(updatedHero?.location).toBe('Updated Location');

    expect(updatedHero?.id).toBe(existingHero.id);
  });

  it('should delete an existing superhero', async () => {
    const existingHero = service.superheroesReadOnly()[0];
    expect(existingHero).toBeTruthy();

    await service.delete(existingHero.id!);

    const heroStillExists = service.superheroesReadOnly().some(h => h.id === existingHero.id);
    expect(heroStillExists).toBeFalse();
  });

  it('should set universe correctly', () => {
    service.setUniverse('dc');
    expect(service.universe()).toBe('dc');
    service.setUniverse(undefined);
    expect(service.universe()).toBeUndefined();
  });

  it('should set search term correctly', async () => {
    await service.setSearchTerm('batman');
    expect(service.searchTermReadOnly()).toBe('batman');
  });

  it('should filter heroes by search term and universe', async () => {
    await service.setSearchTerm('batman');
    service.setUniverse('dc');
    const filtered = service.filteredHeroes();
    expect(filtered.every(h => h.name.toLowerCase().includes('batman') && h.universe === 'dc')).toBeTrue();
  });

  it('should normalize text correctly', () => {
    // @ts-ignore
    expect(service.normalizeText('Ángel García')).toBe('angel garcia');
    // @ts-ignore
    expect(service.normalizeText('Iron-Man!')).toBe('iron-man!');
  });

  it('should throw error when adding a hero with duplicate id', async () => {
    const hero = service.superheroesReadOnly()[0];
    await expectAsync(service.add(hero)).toBeRejectedWith(
      jasmine.stringMatching(/Ya existe un superhero con el ID:/)
    );
  });

  it('should throw error when updating a non-existent hero', async () => {
    await expectAsync(service.update('non-existent-id', { name: 'Test' }))
      .toBeRejectedWith(jasmine.stringMatching(/no encontrado/));
  });

  it('should throw error when deleting a non-existent hero', async () => {
    await expectAsync(service.update('non-existent-id', { name: 'Test' })).toBeRejectedWith(
      jasmine.stringMatching(/no encontrado/)
    );

    await expectAsync(service.delete('non-existent-id')).toBeRejectedWith(
      jasmine.stringMatching(/no encontrado/)
    );
  });
});
