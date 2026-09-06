import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to medical filter with 4 events', () => {
    expect(component.activeFilter).toBe('medical');
    expect(component.filteredEvents.length).toBe(4);
    expect(component.activeEvent.id).toBe('pulmo-2025');
  });

  it('should switch filters correctly and update filteredEvents', () => {
    component.filterBy('career');
    expect(component.activeFilter).toBe('career');
    expect(component.filteredEvents.length).toBe(4);
    expect(component.activeEventIndex).toBe(0);

    component.filterBy('community');
    expect(component.activeFilter).toBe('community');
    expect(component.filteredEvents.length).toBe(5);
  });

  it('should navigate through events with nextEvent and prevEvent', () => {
    component.filterBy('medical');
    expect(component.activeEventIndex).toBe(0);

    component.nextEvent();
    expect(component.activeEventIndex).toBe(1);

    component.prevEvent();
    expect(component.activeEventIndex).toBe(0);

    // Cycling backwards wraps to last
    component.prevEvent();
    expect(component.activeEventIndex).toBe(3);
  });

  it('should switch images within active event', () => {
    component.switchImage(1);
    expect(component.activeImageIndex).toBe(1);
    expect(component.currentImage).toContain('pulmo-event-23');
  });

  it('should fallback to placeholder image on image error', () => {
    const imgElement = document.createElement('img');
    const fakeEvent = { target: imgElement } as unknown as Event;
    component.onImageError(fakeEvent);
    expect(imgElement.src).toContain('assets/placeholder.webp');
  });
});
