import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListComponent } from 'src/app/modules/characters/pages/characters-list/characters-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CharactersListComponent', () => {
    let component: CharactersListComponent;
    let fixture: ComponentFixture<CharactersListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CharactersListComponent],
            imports: [
                FormsModule,
                HttpClientTestingModule,
                MatFormFieldModule,
                MatIconModule,
                MatInputModule,
                MatListModule,
                MatPaginatorModule,
                NoopAnimationsModule,
                RouterTestingModule,
                SharedModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of({
                            page: '1',
                            name: 'Luke',
                        }),
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CharactersListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('renders search input and set its value to equal query param', () => {
        const { debugElement } = fixture;
        const input = debugElement.query(By.css('input'));
        expect(input).toBeTruthy();
        expect(input.properties['value']).toBe('Luke');
    });
});
