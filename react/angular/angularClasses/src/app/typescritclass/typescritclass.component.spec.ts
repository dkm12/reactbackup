import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypescritclassComponent } from './typescritclass.component';

describe('TypescritclassComponent', () => {
  let component: TypescritclassComponent;
  let fixture: ComponentFixture<TypescritclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypescritclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypescritclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
