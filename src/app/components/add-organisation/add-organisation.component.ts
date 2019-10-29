import {Component, OnInit} from '@angular/core';
import {Organisation} from "../../../../api/imports/models/organisation.model";
import {OrganisationsService} from "../../services/organisations.service";

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {

  model = new Organisation();
  busy = false;
  error = '';

  constructor(
    private organisationsService: OrganisationsService
  ) {
  }

  ngOnInit() {
  }

  add() {
    this.busy = true;
    this.error = '';
    this.organisationsService.addOrganisation(this.model)
      .subscribe(() => {
        this.model = new Organisation();
        this.busy = false;
      }, (error) => {
        this.error = `${error.error}: ${error.details}`;
        this.busy = false;
      });
  }

}
