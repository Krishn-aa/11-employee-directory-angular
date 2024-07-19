import { TestBed } from '@angular/core/testing';

import { EmployeeDataService } from './employee-data-service';

describe('EmployeeServiceService', () => {
  let service: EmployeeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
