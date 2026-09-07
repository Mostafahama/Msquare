import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InternshipsComponent } from './internships.component';

describe('InternshipsComponent', () => {
  let component: InternshipsComponent;
  let fixture: ComponentFixture<InternshipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InternshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create InternshipsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 12 internship programs', () => {
    expect(component.items.length).toBe(12);
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.sv-explore-item');
    expect(items.length).toBe(12);
  });

  it('should select internship item correctly', () => {
    component.selectItem(2);
    expect(component.activeIndex).toBe(2);
    expect(component.activeItem.title.en).toBe('Medical Research');
    expect(component.activeItem.title.ar).toBe('البحث الطبي والأدلة الإكلينيكية');
  });
});
