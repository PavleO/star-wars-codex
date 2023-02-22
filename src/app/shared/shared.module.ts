import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [LoadingSpinnerComponent, SearchInputComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
    ],
    exports: [LoadingSpinnerComponent, SearchInputComponent],
})
export class SharedModule {}
