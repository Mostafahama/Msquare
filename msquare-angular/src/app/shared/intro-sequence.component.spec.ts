import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroSequenceComponent } from './intro-sequence.component';

describe('IntroSequenceComponent', () => {
  let component: IntroSequenceComponent;
  let fixture: ComponentFixture<IntroSequenceComponent>;

  beforeEach(async () => {
    sessionStorage.clear();
    await TestBed.configureTestingModule({
      imports: [IntroSequenceComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should skip intro on user skip trigger and emit introComplete', (done) => {
    component.introComplete.subscribe(() => {
      expect(component.isVisible).toBeFalse();
      expect(sessionStorage.getItem('msquare_intro_shown')).toBe('true');
      done();
    });

    component.skipIntro();
  });
});
