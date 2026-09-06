import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagneticButtonDirective, DrawSvgButtonDirective } from './button-fx.directive';

@Component({
  template: `
    <button class="btn-magnetic" [magneticStrength]="0.4">Click</button>
    <div class="btn-drawsvg">
      <svg><path class="draw-path" d="M0 0 L10 10"></path></svg>
    </div>
  `,
  standalone: true,
  imports: [MagneticButtonDirective, DrawSvgButtonDirective]
})
class TestHostComponent {}

describe('ButtonFxDirectives', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should instantiate test component with directives attached', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
