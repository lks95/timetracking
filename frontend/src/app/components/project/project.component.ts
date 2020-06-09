import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { Record } from '../../models/record';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { RecordService } from '../../services/record.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @ViewChild('playButton') playButton;
  @Output() taskEmitter: EventEmitter<Task> = new EventEmitter();

  currentProject?: Project;
  records: Record [];
  recordsOfProject = [];
  selectedTask: Task;
  playButtonPressed = false;
  recordDisplay = '00:00:23';
  displayedColumns = ['date', 'startTime', 'endTime'];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private recordService: RecordService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.subscribeToObservables();
  }

  ngOnInit(): void {
    this.getProject();
  }

  subscribeToObservables() {
    this.projectService.onProjectSelection.subscribe(project => {
      this.currentProject = project;
    });
  }

  onSelect(task: Task): void {
    if (!this.playButtonPressed && this.selectedTask === task) {
      this.selectedTask = null;
      this.taskEmitter.emit(null);
    } else if (!this.playButtonPressed) {
      this.selectedTask = task;
      this.taskEmitter.emit(task);
    }
  }

  getProject(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => {
        this.projectService.selectProject(project);
      });
  }

  getRecords(): void {
    // TODO Implement me
    // this.recordService.getRecords()
    //   .subscribe(records => this.records = records);
    // this.records.forEach((record) => {
    //   if (record.project === this.currentProject._id && !record.task) {
    //     this.recordsOfProject.push(record);
    //   }
    // });
  }

  getTasksNotCompleted(): Task[] {
    const tasksNotCompleted = [];
    this.currentProject?.tasks?.forEach(task => {
      if (!task.completed) {
        tasksNotCompleted.push(task);
      }
    });
    return tasksNotCompleted;
  }

  getTasksCompleted(): Task[] {
    const tasksCompleted = [];
    this.currentProject?.tasks?.forEach(task => {
      if (task.completed) {
        tasksCompleted.push(task);
      }
    });
    return tasksCompleted;
  }

  play(){
    // TODO: Record starten oder stoppen
    if (!this.playButtonPressed && !this.playButton.disabled){
      this.playButtonPressed = true;
    } else if (this.playButtonPressed) {
      this.playButtonPressed = false;
      this.selectedTask = null;
    }
  }

  goBack(): void {
    this.location.back();
  }

  openTaskCreationDialog(): void {
    // TODO
  }

  openRecordCreationDialog(): void {
    // TODO
  }

  openProjectEditDialog(): void {
    // TODO
  }

  setCompletion(): void {
    if (this.selectedTask.completed){
      this.setTaskNotCompleted();
    } else {
      this.setTaskCompleted();
    }
  }
  setTaskCompleted(): void {
    this.selectedTask.completed = true;
    // TODO
  }

  setTaskNotCompleted(): void {
    this.selectedTask.completed = false;
    // TODO
  }
}
