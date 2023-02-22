import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CharactersService } from 'src/app/characters/characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from 'src/app/characters/character.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-characters-detail',
    templateUrl: './characters-detail.component.html',
    styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent implements OnInit {
    selectedCharacter?: Observable<Character | null>;
    constructor(
        public charactersService: CharactersService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.selectedCharacter = this.charactersService.selectedCharacter$;
        const id = +this.route.snapshot.params['id'];
        this.charactersService.getCharacter(id);
    }

    toggleFavorite(characterId: number) {
        this.charactersService.toggleFavoriteCharacter(characterId);
    }

    navigateBack() {
        this.location.back();
    }
}
