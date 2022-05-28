import {TestBed} from '@angular/core/testing';

import {Decovid19Service} from './decovid19.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('Decovid19Service', () => {
  let service: Decovid19Service;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(Decovid19Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
