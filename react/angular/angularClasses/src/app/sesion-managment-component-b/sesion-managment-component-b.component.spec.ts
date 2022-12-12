import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionManagmentComponentBComponent } from './sesion-managment-component-b.component';

describe('SesionManagmentComponentBComponent', () => {
  let component: SesionManagmentComponentBComponent;
  let fixture: ComponentFixture<SesionManagmentComponentBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionManagmentComponentBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionManagmentComponentBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
