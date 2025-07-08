export type UniverseType = 'dc' | 'marvel';

export interface SuperheroProps{
    id?:string;
    name:string;
    universe:UniverseType;
    alterEgos:string[];
    powers:string[];
    location:string;
    imageUrl:string;
}

export class Superhero{
    id?:string;
    name:string;
    universe:UniverseType;
    alterEgos:string[];
    powers:string[];
    location:string;
    imageUrl:string;

    constructor(data: SuperheroProps){
        this.name = data.name;
        this.universe = data.universe;
        this.alterEgos = data.alterEgos;
        this.powers = data.powers;
        this.location = data.location;
        this.imageUrl = data.imageUrl;
        this.id = data.id ?? this.generateId();
    }


    private generateId(): string {
        const slug = (text:string) =>
            text.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')

        return `superhero-${slug(this.universe)}-${slug(this.name)}`;
    }
}