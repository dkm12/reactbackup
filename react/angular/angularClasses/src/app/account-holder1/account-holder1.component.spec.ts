import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolder1Component } from './account-holder1.component';

describe('AccountHolder1Component', () => {
  let component: AccountHolder1Component;
  let fixture: ComponentFixture<AccountHolder1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHolder1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHolder1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
