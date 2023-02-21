import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/characters/characters.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.sass'],
})
export class CharactersListComponent implements OnInit {
    pageIndex = 0;
    searchTerm = '';
    constructor(
        public charactersService: CharactersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            this.pageIndex = (parseInt(params['page']) || 1) - 1;
            this.charactersService
                .getCharacters(parseInt(params['page']) || 1, params['name'])
                .subscribe();
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
        console.log(characterId);
    }

    filterCharacters(nameFilter: string) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { name: nameFilter },
        });
    }
}
