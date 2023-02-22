import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
    searchTerm = '';

    @Output()
    searchTermChange = new EventEmitter<string>();

    @Input()
    defaultSearchInput: string = '';

    @Input()
    label: string = 'Type search expression';

    ngOnInit(): void {
        this.searchTerm = this.defaultSearchInput;
    }

    search() {
        this.searchTermChange.emit(this.searchTerm);
    }

    clear() {
        this.searchTerm = '';
        this.searchTermChange.emit(this.searchTerm);
    }
}
