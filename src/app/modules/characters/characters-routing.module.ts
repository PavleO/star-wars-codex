import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from 'src/app/modules/characters/pages/characters-list/characters-list.component';
import { CharactersDetailComponent } from 'src/app/modules/characters/pages/characters-detail/characters-detail.component';

const appRoutes: Routes = [
    {
        path: '',
        component: CharactersListComponent,
    },
    {
        path: ':id',
        component: CharactersDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule],
})
export class CharactersRoutingModule {}
