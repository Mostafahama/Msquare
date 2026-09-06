import { TestBed } from '@angular/core/testing';
import { SmoothScrollService } from './smooth-scroll.service';

describe('SmoothScrollService', () => {
  let service: SmoothScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothScrollService);
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should safely initialize and destroy without crashing', () => {
    service.init();
    expect(service).toBeTruthy();
    service.destroy();
  });
});
