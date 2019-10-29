import { TestBed } from '@angular/core/testing';

import { OrganisationsService } from './organisations.service';

describe('OrganisationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganisationsService = TestBed.get(OrganisationsService);
    expect(service).toBeTruthy();
  });
});
