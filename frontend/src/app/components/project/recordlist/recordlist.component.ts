import {Component, Input, OnInit} from '@angular/core';
import {Record} from '../../../models/record';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-recordlist',
  templateUrl: './recordlist.component.html',
  styleUrls: ['./recordlist.component.scss']
})
export class RecordlistComponent implements OnInit {

  @Input() records: Record[];
  currentProject: Project;

  constructor(
    private projectService: ProjectService
  ) {
    this.subscribeToObservables();
  }

  ngOnInit(): void {
    console.log(this.records?.length);
  }

  subscribeToObservables(): void {
    this.projectService.onProjectSelection.subscribe(project => {
      this.currentProject = project;
    });
  }

  openRecordCreationDialog(): void {
    // TODO Implement me
  }


}
