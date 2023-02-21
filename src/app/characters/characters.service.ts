import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    BasicCharacter,
    Character,
    CharacterFromServer,
} from 'src/app/characters/character.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    constructor(private http: HttpClient) {}

    private singleCharacterSubject = new BehaviorSubject<Character | null>(
        null
    );
    private charactersSubject = new BehaviorSubject<BasicCharacter[] | null>(
        null
    );

    private charactersCountSubject = new BehaviorSubject<number>(0);

    public character$ = this.singleCharacterSubject.asObservable();
    public characters$ = this.charactersSubject.asObservable();

    public charactersCount$ = this.charactersCountSubject.asObservable();

    public getCharacter(id: number) {
        this.singleCharacterSubject.next(null);
        return this.http
            .get<CharacterFromServer>(`https://swapi.dev/api/people/${id}`)
            .pipe(
                tap(char => {
                    const httpRequests: Observable<{
                        title?: string;
                        name?: string;
                        url: string;
                    }>[] = char.films.map(filmUrl =>
                        this.http.get<{ title: string; url: string }>(filmUrl)
                    );
                    httpRequests.push(
                        this.http.get<{ name: string; url: string }>(
                            char.homeworld
                        )
                    );
                    forkJoin(httpRequests).subscribe(allResults =>
                        this.singleCharacterSubject.next(
                            new Character({
                                ...char,
                                films: char.films.map(
                                    filmUrl =>
                                        allResults.find(
                                            film => film.url === filmUrl
                                        )?.title ?? ''
                                ),
                                homeworld:
                                    allResults.find(
                                        homeworld =>
                                            homeworld.url === char.homeworld
                                    )?.name ?? '',
                            })
                        )
                    );
                })
            );
    }
    public getCharacters(page?: number, nameFilter?: string) {
        this.charactersSubject.next(null);
        this.charactersCountSubject.next(0);
        return this.http
            .get<{ results: CharacterFromServer[]; count: number }>(
                `https://swapi.dev/api/people/?${page ? `page=${page}&` : ''}${
                    nameFilter ? `search=${nameFilter}` : ''
                }`
            )
            .pipe(
                tap(response => {
                    this.charactersSubject.next(
                        response.results.map(char => new BasicCharacter(char))
                    );
                    this.charactersCountSubject.next(response.count);
                })
            );
    }
}
