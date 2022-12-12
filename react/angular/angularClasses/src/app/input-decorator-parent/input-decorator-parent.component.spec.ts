import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDecoratorParentComponent } from './input-decorator-parent.component';

describe('InputDecoratorParentComponent', () => {
  let component: InputDecoratorParentComponent;
  let fixture: ComponentFixture<InputDecoratorParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDecoratorParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDecoratorParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
