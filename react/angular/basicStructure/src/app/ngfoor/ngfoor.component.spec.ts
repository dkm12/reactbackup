import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgfoorComponent } from './ngfoor.component';

describe('NgfoorComponent', () => {
  let component: NgfoorComponent;
  let fixture: ComponentFixture<NgfoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgfoorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgfoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
