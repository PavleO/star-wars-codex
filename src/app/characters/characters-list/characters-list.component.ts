import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/characters/characters.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BasicCharacter } from 'src/app/characters/character.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
})
export class CharactersListComponent implements OnInit {
    pageIndex = 0;
    searchTerm = '';

    characters?: Observable<BasicCharacter[] | null>;
    charactersCount?: Observable<number>;

    constructor(
        public charactersService: CharactersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.characters = this.charactersService.characters$;
        this.charactersCount = this.charactersService.charactersCount$;
        this.route.queryParams.subscribe((params: Params) => {
            this.pageIndex = (parseInt(params['page']) || 1) - 1;
            this.searchTerm = params['name'] || '';
            this.charactersService.getCharacters(
                parseInt(params['page']) || 1,
                params['name']
            );
        });
    }

    goToDetails(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    changePage(event: PageEvent) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: (event.pageIndex || 0) + 1 },
            queryParamsHandling: 'merge',
        });
    }

    toggleFavorite(event: MouseEvent, characterId: number) {
        event.stopPropagation();
        this.charactersService.toggleFavoriteCharacter(characterId);
    }

    filterCharacters(nameFilter: string) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { name: nameFilter },
        });
    }
}
