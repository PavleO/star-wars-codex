import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/characters', pathMatch: 'full' },
    {
        path: 'characters',
        loadChildren: () =>
            import('src/app/modules/characters/characters.module').then(
                m => m.CharactersModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
