import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionManagmentComponentComponent } from './sesion-managment-component.component';

describe('SesionManagmentComponentComponent', () => {
  let component: SesionManagmentComponentComponent;
  let fixture: ComponentFixture<SesionManagmentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionManagmentComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionManagmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
