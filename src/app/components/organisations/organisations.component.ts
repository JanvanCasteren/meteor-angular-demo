import { Component, OnInit } from '@angular/core';
import {OrganisationsService} from '../../services/organisations.service';
import {Observable} from 'rxjs';
import {Organisation} from '../../../../api/imports/models/organisation.model';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.scss']
})
export class OrganisationsComponent implements OnInit {

  constructor(
    private organisationsService: OrganisationsService
  ) {
  }

  ngOnInit() {
  }

  remove(id) {
    this.organisationsService.removeOrganisation(id)
      .subscribe(() => {
      }, (error) => {
        alert(`${error.error}: ${error.details}`);
      });
  }

}
