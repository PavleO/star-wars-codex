export interface FilmFromServer {
    url: string;
    title: string;
}

export interface PlanetFromServer {
    url: string;
    name: string;
}

export interface CharacterFromServer {
    url: string;
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
}

export class BasicCharacter {
    public id: number;
    public name: string;
    public isFavorite = false;

    constructor(characterFromServer: CharacterFromServer) {
        //TODO: handle this better
        this.id = parseInt(characterFromServer.url.match(/\d+/)?.[0] || '0');
        this.name = characterFromServer.name;
    }
}

export class Character extends BasicCharacter {
    public height: string;
    public mass: string;
    public birthYear: string;
    public gender: string;
    public homeworld: string;
    public films: string[];

    constructor(characterFromServer: CharacterFromServer) {
        super(characterFromServer);
        this.height = characterFromServer.height;
        this.mass = characterFromServer.mass;
        this.birthYear = characterFromServer.birth_year;
        this.gender = characterFromServer.gender;
        this.homeworld = characterFromServer.homeworld;
        this.films = characterFromServer.films;
    }
}
