import { Superhero, SuperheroProps, UniverseType } from './superheroe.model';


describe('Superhero Model', () => {
    const baseData: SuperheroProps = {
    name: 'Spider-Man',
    universe: 'marvel',
    alterEgos: ['Peter Parker'],
    powers: ['Agility', 'Spider Sense'],
    location: 'New York',
    imageUrl: 'spiderman.jpg'
  };

   it('should create a Superhero with provided data', () => {
    const hero = new Superhero(baseData);
    expect(hero.name).toBe('Spider-Man');
    expect(hero.universe).toBe('marvel');
    expect(hero.alterEgos).toEqual(['Peter Parker']);
    expect(hero.powers).toEqual(['Agility', 'Spider Sense']);
    expect(hero.location).toBe('New York');
    expect(hero.imageUrl).toBe('spiderman.jpg');
  });

  it('should generate an id if not provided', () => {
    const hero = new Superhero(baseData);
    expect(hero.id).toBe('superhero-marvel-spider-man');
  });

   it('should use provided id if given', () => {
    const customId = 'custom-id-123';
    const hero = new Superhero({ ...baseData, id: customId });
    expect(hero.id).toBe(customId);
  });

  it('should generate id with normalized characters', () => {
    const hero = new Superhero({
      ...baseData,
      name: 'Ángel García',
      universe: 'dc'
    });
    expect(hero.id).toBe('superhero-dc-angel-garcia');
  });

   it('should generate id with spaces and special characters replaced', () => {
    const hero = new Superhero({
      ...baseData,
      name: 'Iron Man!',
      universe: 'marvel'
    });
    expect(hero.id).toBe('superhero-marvel-iron-man');
  });
});