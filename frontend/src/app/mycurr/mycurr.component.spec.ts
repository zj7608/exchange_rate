import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycurrComponent } from './mycurr.component';

describe('MycurrComponent', () => {
  let component: MycurrComponent;
  let fixture: ComponentFixture<MycurrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MycurrComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycurrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
