import { TestBed } from '@angular/core/testing';

import { Servicecomponent2Service } from './servicecomponent2.service';

describe('Servicecomponent2Service', () => {
  let service: Servicecomponent2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicecomponent2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
