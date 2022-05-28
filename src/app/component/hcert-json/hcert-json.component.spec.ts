import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HcertJsonComponent} from './hcert-json.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HcertJsonComponent', () => {
  let component: HcertJsonComponent;
  let fixture: ComponentFixture<HcertJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HcertJsonComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HcertJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
