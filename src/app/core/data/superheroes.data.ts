import {Superhero} from '../models/superheroe.model'

export const SUPERHEROES: Superhero[] = [
  new Superhero({
    name: 'Superman',
    universe: 'dc',
    alterEgos: ['Clark Kent', 'Kal-El'],
    powers: ['Superfuerza', 'Vuelo', 'Visión láser', 'Invulnerabilidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/791.jpg',
    location: 'Metrópolis'
  }),
  new Superhero({
    name: 'Batman',
    universe: 'dc',
    alterEgos: ['Bruce Wayne'],
    powers: ['Intelecto estratégico', 'Artes marciales', 'Gadgets'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/639.jpg',
    location: 'Gotham City'
  }),
  new Superhero({
    name: 'Wonder Woman',
    universe: 'dc',
    alterEgos: ['Diana Prince'],
    powers: ['Fuerza sobrehumana', 'Vuelo', 'Lazo de la verdad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/807.jpg',
    location: 'Themyscira'
  }),
  new Superhero({
    name: 'The Flash',
    universe: 'dc',
    alterEgos: ['Barry Allen'],
    powers: ['Supervelocidad', 'Viajes en el tiempo', 'Curación rápida'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/892.jpg',
    location: 'Central City'
  }),
  new Superhero({
    name: 'Aquaman',
    universe: 'dc',
    alterEgos: ['Arthur Curry'],
    powers: ['Comunicación marina', 'Fuerza', 'Resistencia'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/634.jpg',
    location: 'Atlantis'
  }),
  new Superhero({
    name: 'Green Lantern',
    universe: 'dc',
    alterEgos: ['Hal Jordan'],
    powers: ['Anillo de poder', 'Creación de energía sólida'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/697.jpg',
    location: 'Sector 2814'
  }),
  new Superhero({
    name: 'Cyborg',
    universe: 'dc',
    alterEgos: ['Victor Stone'],
    powers: ['Cibernética', 'Tecnología', 'Superinteligencia'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/1204.jpg',
    location: 'Detroit'
  }),
  new Superhero({
    name: 'Shazam',
    universe: 'dc',
    alterEgos: ['Billy Batson'],
    powers: ['Magia', 'Electricidad', 'Fuerza', 'Velocidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/278.jpg',
    location: 'Filadelfia'
  }),
  new Superhero({
    name: 'Martian Manhunter',
    universe: 'dc',
    alterEgos: ['J\'onn J\'onzz'],
    powers: ['Telepatía', 'Cambio de forma', 'Intangibilidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/733.jpg',
    location: 'Marte / Tierra'
  }),
  new Superhero({
    name: 'Green Arrow',
    universe: 'dc',
    alterEgos: ['Oliver Queen'],
    powers: ['Arco y flecha', 'Estrategia', 'Combate cuerpo a cuerpo'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/696.jpg',
    location: 'Star City'
  }),

  // Marvel
  new Superhero({
    name: 'Spider-Man',
    universe: 'marvel',
    alterEgos: ['Peter Parker'],
    powers: ['Sentido arácnido', 'Telarañas', 'Agilidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/133.jpg',
    location: 'Nueva York'
  }),
  new Superhero({
    name: 'Iron Man',
    universe: 'marvel',
    alterEgos: ['Tony Stark'],
    powers: ['Armadura', 'Tecnología', 'Vuelo', 'Rayos repulsores'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/85.jpg',
    location: 'Malibú'
  }),
  new Superhero({
    name: 'Captain America',
    universe: 'marvel',
    alterEgos: ['Steve Rogers'],
    powers: ['Superfuerza', 'Escudo vibranium', 'Resistencia'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/274.jpg',
    location: 'Brooklyn'
  }),
  new Superhero({
    name: 'Thor',
    universe: 'marvel',
    alterEgos: ['Thor Odinson'],
    powers: ['Trueno', 'Martillo Mjolnir', 'Fuerza divina'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/140.jpg',
    location: 'Asgard'
  }),
  new Superhero({
    name: 'Black Widow',
    universe: 'marvel',
    alterEgos: ['Natasha Romanoff'],
    powers: ['Espionaje', 'Artes marciales', 'Tecnología'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/248.jpg',
    location: 'Rusia / USA'
  }),
  new Superhero({
    name: 'Hulk',
    universe: 'marvel',
    alterEgos: ['Bruce Banner'],
    powers: ['Fuerza sobrehumana', 'Regeneración', 'Invulnerabilidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/83.jpg',
    location: 'Estados Unidos'
  }),
  new Superhero({
    name: 'Doctor Strange',
    universe: 'marvel',
    alterEgos: ['Stephen Strange'],
    powers: ['Magia', 'Manipulación del tiempo', 'Hechizos'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/55.jpg',
    location: 'Sanctum Sanctorum, Nueva York'
  }),
  new Superhero({
    name: 'Black Panther',
    universe: 'marvel',
    alterEgos: ['T\'Challa'],
    powers: ['Fuerza felina', 'Tecnología', 'Agilidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/247.jpg',
    location: 'Wakanda'
  }),
  new Superhero({
    name: 'Scarlet Witch',
    universe: 'marvel',
    alterEgos: ['Wanda Maximoff'],
    powers: ['Magia del caos', 'Manipulación de la realidad'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/444.jpg',
    location: 'Sokovia'
  }),
  new Superhero({
    name: 'Ant-Man',
    universe: 'marvel',
    alterEgos: ['Scott Lang'],
    powers: ['Cambio de tamaño', 'Fuerza aumentada', 'Tecnología Pym'],
    imageUrl: 'https://www.superherodb.com/pictures2/portraits/10/100/166.jpg',
    location: 'San Francisco'
  })
];
