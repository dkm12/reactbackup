import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegfortempdrivenComponent } from './regfortempdriven.component';

describe('RegfortempdrivenComponent', () => {
  let component: RegfortempdrivenComponent;
  let fixture: ComponentFixture<RegfortempdrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegfortempdrivenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegfortempdrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
