import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetailComponent } from './characters-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CharactersDetailComponent', () => {
    let component: CharactersDetailComponent;
    let fixture: ComponentFixture<CharactersDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CharactersDetailComponent],
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: '1' } },
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(CharactersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
