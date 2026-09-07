import { Injectable, signal, computed, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TRANSLATIONS_EN } from '../i18n/translations.en';
import { TRANSLATIONS_AR } from '../i18n/translations.ar';
import { UiTranslations } from '../i18n/translations.interface';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export type Language = 'en' | 'ar';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly storageKey = 'msquare_lang';

  readonly currentLang = signal<Language>('en');
  readonly t = computed<UiTranslations>(() => {
    return this.currentLang() === 'ar' ? TRANSLATIONS_AR : TRANSLATIONS_EN;
  });
  readonly isRtl = computed<boolean>(() => this.currentLang() === 'ar');

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initLanguage();
  }

  private initLanguage() {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem(this.storageKey) as Language | null;
    const initialLang: Language = saved === 'ar' || saved === 'en' ? saved : 'en';

    this.applyLanguage(initialLang, false);
  }

  setLanguage(lang: Language) {
    if (this.currentLang() === lang) return;
    this.applyLanguage(lang, true);
  }

  toggleLanguage() {
    const nextLang: Language = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(nextLang);
  }

  private applyLanguage(lang: Language, shouldRefreshGsap = true) {
    this.currentLang.set(lang);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, lang);
      } catch {
        // Safe fallback if storage quota exceeded or disabled
      }

      const html = this.document.documentElement;
      html.setAttribute('lang', lang);
      html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

      if (shouldRefreshGsap) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 80);
        });
      }
    }
  }
}
