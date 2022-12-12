import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgifdirectiveComponent } from './ngifdirective.component';

describe('NgifdirectiveComponent', () => {
  let component: NgifdirectiveComponent;
  let fixture: ComponentFixture<NgifdirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgifdirectiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgifdirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
