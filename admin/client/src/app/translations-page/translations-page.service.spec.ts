import { TestBed } from '@angular/core/testing';

import { TranslationsPageService } from './translations-page.service';

describe('TranslationsPageService', () => {
  let service: TranslationsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
