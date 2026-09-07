import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.setAttribute('lang', 'en');
    document.documentElement.setAttribute('dir', 'ltr');
  });

  it('should be created and default to English', () => {
    expect(service).toBeTruthy();
    expect(service.currentLang()).toBe('en');
    expect(service.isRtl()).toBeFalse();
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
  });

  it('should toggle to Arabic and update HTML attributes and persistence', () => {
    service.toggleLanguage();
    expect(service.currentLang()).toBe('ar');
    expect(service.isRtl()).toBeTrue();
    expect(document.documentElement.getAttribute('lang')).toBe('ar');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
    expect(localStorage.getItem('msquare_lang')).toBe('ar');
    expect(service.t().nav.identity).toBe('هويتنا');

    service.toggleLanguage();
    expect(service.currentLang()).toBe('en');
    expect(service.isRtl()).toBeFalse();
    expect(document.documentElement.getAttribute('lang')).toBe('en');
    expect(document.documentElement.getAttribute('dir')).toBe('ltr');
    expect(localStorage.getItem('msquare_lang')).toBe('en');
    expect(service.t().nav.identity).toBe('Identity');
  });

  it('should set specific language correctly', () => {
    service.setLanguage('ar');
    expect(service.currentLang()).toBe('ar');
    expect(service.isRtl()).toBeTrue();

    // Redundant call should not error
    service.setLanguage('ar');
    expect(service.currentLang()).toBe('ar');
  });
});
