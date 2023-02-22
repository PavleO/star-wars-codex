import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersDetailComponent } from 'src/app/modules/characters/pages/characters-detail/characters-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';

describe('CharactersDetailComponent', () => {
    let component: CharactersDetailComponent;
    let fixture: ComponentFixture<CharactersDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CharactersDetailComponent],
            imports: [
                HttpClientTestingModule,
                RouterTestingModule,
                SharedModule,
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: '1' } },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CharactersDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('renders spinner component', () => {
        const { debugElement } = fixture;
        const spinner = debugElement.query(By.css('app-loading-spinner'));
        expect(spinner).toBeTruthy();
    });
});
