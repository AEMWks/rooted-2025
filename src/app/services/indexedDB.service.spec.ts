import { TestBed } from '@angular/core/testing';

import { IndexedDBService } from './indexedDB.service';

describe('MydbService', () => {
  let service: IndexedDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexedDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
