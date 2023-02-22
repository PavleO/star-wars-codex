import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BasicCharacter,
    Character,
    CharacterFromServer,
    FilmFromServer,
    PlanetFromServer,
} from 'src/app/modules/characters/models/character.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppConstants } from 'src/app/shared/app-constants';

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    private characters: BasicCharacter[] = [];
    private selectedCharacter: Character | null = null;
    private favoriteCharacters: number[] = [];
    readonly selectedCharacter$ = new BehaviorSubject<Character | null>(null);
    readonly characters$ = new BehaviorSubject<BasicCharacter[] | null>(null);
    readonly charactersCount$ = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {
        const savedFavorites = localStorageService.getItem<number[]>(
            AppConstants.favoriteStarWarsCharactersLocalStorageKey
        );
        if (savedFavorites) {
            this.favoriteCharacters = savedFavorites;
        }
    }

    public getCharacter(id: number) {
        this.selectedCharacter$.next(null);
        this.http
            .get<CharacterFromServer>(
                `${AppConstants.starWarsCharactersBaseURL}/${id}`
            )
            .pipe(
                tap(char => {
                    forkJoin([
                        ...char.films.map(filmUrl =>
                            this.http.get<FilmFromServer>(filmUrl)
                        ),
                        this.http.get<PlanetFromServer>(char.homeworld),
                    ]).subscribe(allResults => {
                        this.selectedCharacter =
                            this.parseServerDataAndCreateCharacter(
                                allResults,
                                char
                            );
                        this.selectedCharacter$.next(this.selectedCharacter);
                    });
                })
            )
            .subscribe();
    }
    public getCharacters(page?: number, nameFilter?: string) {
        this.characters$.next(null);
        this.charactersCount$.next(0);
        this.http
            .get<{ results: CharacterFromServer[]; count: number }>(
                `${AppConstants.starWarsCharactersBaseURL}/?${
                    page ? `page=${page}&` : ''
                }${nameFilter ? `search=${nameFilter}` : ''}`
            )
            .pipe(
                tap(response => {
                    this.characters = response.results.map(char => {
                        const basicChar = new BasicCharacter(char);
                        basicChar.isFavorite = this.checkIfCharacterIsFavorite(
                            basicChar.id
                        );
                        return basicChar;
                    });
                    this.characters$.next([...this.characters]);
                    this.charactersCount$.next(response.count);
                })
            )
            .subscribe();
    }

    toggleFavoriteCharacter(id: number) {
        const index = this.favoriteCharacters.indexOf(id);
        const character = this.characters.find(
            character => character.id === id
        );
        if (index > -1) {
            this.favoriteCharacters.splice(index, 1);
            if (character) {
                character.isFavorite = false;
            }
        } else {
            this.favoriteCharacters.push(id);
            if (character) {
                character.isFavorite = true;
            }
        }
        this.localStorageService.setItem(
            AppConstants.favoriteStarWarsCharactersLocalStorageKey,
            this.favoriteCharacters
        );
        if (this.selectedCharacter?.id === id) {
            this.selectedCharacter.isFavorite =
                !this.selectedCharacter.isFavorite;
            this.selectedCharacter$.next({ ...this.selectedCharacter });
        }
        this.characters$.next([...this.characters]);
    }

    checkIfCharacterIsFavorite(charId: number): boolean {
        return !!this.favoriteCharacters.find(
            favoriteCharId => charId === favoriteCharId
        );
    }

    private instanceOfFilm(data: object): data is FilmFromServer {
        return 'title' in data;
    }

    private instanceOfPlanet(data: object): data is PlanetFromServer {
        return 'name' in data;
    }

    private parseServerDataAndCreateCharacter(
        data: (FilmFromServer | PlanetFromServer)[],
        char: CharacterFromServer
    ) {
        const filmNames = data
            .filter(filmOrHomeWorld => this.instanceOfFilm(filmOrHomeWorld))
            .map(film => (film as FilmFromServer).title ?? '');

        const homeWorldName =
            (
                data.find(filmOrHomeWorld =>
                    this.instanceOfPlanet(filmOrHomeWorld)
                ) as PlanetFromServer
            )?.name ?? '';

        const character = new Character({
            ...char,
            films: filmNames,
            homeworld: homeWorldName,
        });

        character.isFavorite = this.checkIfCharacterIsFavorite(character.id);

        return character;
    }
}
