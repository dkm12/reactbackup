import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpagemcontentComponent } from './hpagemcontent.component';

describe('HpagemcontentComponent', () => {
  let component: HpagemcontentComponent;
  let fixture: ComponentFixture<HpagemcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpagemcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpagemcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
