import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnersComponent } from './partners.component';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartnersComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 19 partners and create duplicated marquee rows', () => {
    expect(component.partners.length).toBe(19);
    expect(component.marqueeRow1.length).toBe(38);
    expect(component.marqueeRow2.length).toBe(38);
    expect(component.marqueeRow1[0].name).toBe('Novo Nordisk');
    expect(component.marqueeRow2[0].name).toBe('ENGAZ Initiative');
  });

  it('should toggle pause and resume marquee state', () => {
    expect(component.isPaused).toBeFalse();
    component.pauseMarquee();
    expect(component.isPaused).toBeTrue();
    component.resumeMarquee();
    expect(component.isPaused).toBeFalse();
  });

  it('should select and toggle active partner', () => {
    expect(component.activePartner).toBeNull();
    component.selectPartner('Novo Nordisk');
    expect(component.activePartner).toBe('Novo Nordisk');
    component.selectPartner('Novo Nordisk');
    expect(component.activePartner).toBeNull();
  });
});
