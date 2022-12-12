import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolder2Component } from './account-holder2.component';

describe('AccountHolder2Component', () => {
  let component: AccountHolder2Component;
  let fixture: ComponentFixture<AccountHolder2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHolder2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHolder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
