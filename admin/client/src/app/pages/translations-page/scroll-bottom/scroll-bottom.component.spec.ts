import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollBottomComponent } from './scroll-bottom.component';

describe('ScrollBottomComponent', () => {
    let component: ScrollBottomComponent;
    let fixture: ComponentFixture<ScrollBottomComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ScrollBottomComponent],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollBottomComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
