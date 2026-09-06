import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentityComponent, VALUES_DATA } from './identity.component';

describe('IdentityComponent', () => {
  let component: IdentityComponent;
  let fixture: ComponentFixture<IdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentityComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all values from VALUES_DATA', () => {
    expect(component.values.length).toBe(6);
    expect(component.values).toEqual(VALUES_DATA);

    const compiled = fixture.nativeElement as HTMLElement;
    const valueCards = compiled.querySelectorAll('.value-item');
    expect(valueCards.length).toBe(6);
  });
});
