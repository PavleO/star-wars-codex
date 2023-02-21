import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersDetailComponent } from './characters-detail/characters-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [CharactersListComponent, CharactersDetailComponent],
    imports: [
        CommonModule,
        CharactersRoutingModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        MatListModule,
        MatPaginatorModule,
        SharedModule,
    ],
})
export class CharactersModule {}
