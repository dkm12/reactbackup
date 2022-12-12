import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserveApiComponent } from './observe-api.component';

describe('ObserveApiComponent', () => {
  let component: ObserveApiComponent;
  let fixture: ComponentFixture<ObserveApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObserveApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserveApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
