import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header/header.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        HeaderComponent,
        SearchInputComponent,
    ],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
    ],
    exports: [LoadingSpinnerComponent, HeaderComponent, SearchInputComponent],
})
export class SharedModule {}
