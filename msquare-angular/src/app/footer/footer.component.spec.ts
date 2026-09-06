import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year in copyright', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ft-bottom')?.textContent).toContain(component.currentYear.toString());
  });

  it('should display MSQUARE brand name and tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.ft-brand-text')?.textContent).toContain('MSQUARE');
    expect(compiled.querySelector('.ft-tag')?.textContent).toContain('Transform Healthcare Events Into Impact');
  });
});

