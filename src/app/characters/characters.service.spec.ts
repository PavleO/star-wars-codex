import { TestBed } from '@angular/core/testing';
import { CharactersService } from './characters.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { Character } from 'src/app/characters/character.model';
import Expected = jasmine.Expected;

describe('CharactersService', () => {
    let service: CharactersService;
    let controller: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CharactersService],
        });

        service = TestBed.inject(CharactersService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get and parse character by ID', () => {
        let actualCharacter: Character | null = null;
        service.selectedCharacter$.subscribe(char => {
            actualCharacter = char;
        });
        service.getCharacter(1);
        const peopleRequest = controller.expectOne(
            'https://swapi.dev/api/people/1'
        );
        peopleRequest.flush({
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: ['https://swapi.dev/api/films/1/'],
            url: 'https://swapi.dev/api/people/1/',
        });
        const filmRequest = controller.expectOne(
            'https://swapi.dev/api/films/1/'
        );
        filmRequest.flush({
            title: 'A New Hope',
            url: 'https://swapi.dev/api/films/1/',
        });
        const planetRequest = controller.expectOne(
            'https://swapi.dev/api/planets/1/'
        );
        planetRequest.flush({
            name: 'Tatooine',
            url: 'https://swapi.dev/api/planets/1/',
        });
        controller.verify();
        expect(actualCharacter).toBeTruthy();
        const expectedCharacter = new Character({
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            films: ['A New Hope'],
            homeworld: 'Tatooine',
            gender: 'male',
            url: 'https://swapi.dev/api/people/1/',
        }) as Expected<any>;
        expect(actualCharacter).toEqual(expectedCharacter);
    });
});
