import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompForService2Component } from './comp-for-service2.component';

describe('CompForService2Component', () => {
  let component: CompForService2Component;
  let fixture: ComponentFixture<CompForService2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompForService2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompForService2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
