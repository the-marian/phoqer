import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsPageComponent } from './translations-page.component';

describe('TranslationsPageComponent', () => {
  let component: TranslationsPageComponent;
  let fixture: ComponentFixture<TranslationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
