import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ContactComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 contact items (Headquarters, Email, Phone 1, Phone 2)', () => {
    expect(component.contactItems.length).toBe(4);
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.ct-item');
    expect(items.length).toBe(4);
  });
});
