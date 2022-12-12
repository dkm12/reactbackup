import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDecoratorChildComponent } from './input-decorator-child.component';

describe('InputDecoratorChildComponent', () => {
  let component: InputDecoratorChildComponent;
  let fixture: ComponentFixture<InputDecoratorChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputDecoratorChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDecoratorChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
