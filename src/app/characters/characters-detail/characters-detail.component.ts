import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CharactersService } from 'src/app/characters/characters.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-characters-detail',
    templateUrl: './characters-detail.component.html',
    styleUrls: ['./characters-detail.component.sass'],
})
export class CharactersDetailComponent implements OnInit {
    constructor(
        public charactersService: CharactersService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            const id = +params['id'];
            this.charactersService.getCharacter(id).subscribe();
        });
    }
}
