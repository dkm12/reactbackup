import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompForService1Component } from './comp-for-service1.component';

describe('CompForService1Component', () => {
  let component: CompForService1Component;
  let fixture: ComponentFixture<CompForService1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompForService1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompForService1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
