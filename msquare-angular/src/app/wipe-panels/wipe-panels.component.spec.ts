import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WipePanelsComponent } from './wipe-panels.component';

describe('WipePanelsComponent', () => {
  let component: WipePanelsComponent;
  let fixture: ComponentFixture<WipePanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WipePanelsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WipePanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
