import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ServicesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 12 healthcare services', () => {
    expect(component.items.length).toBe(12);
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.sv-explore-item');
    expect(items.length).toBe(12);
  });

  it('should change active item when selectItem is called', () => {
    component.selectItem(1);
    expect(component.activeIndex).toBe(1);
    expect(component.activeItem.id).toBe('srv-2');
  });
});
