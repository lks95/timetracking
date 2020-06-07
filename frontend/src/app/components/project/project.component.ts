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

  tasks: Task[];
  tasksOfProject = [];
  records: Record [];
  recordsOfProject = [];
  selectedTask: Task;
  project: Project;
  playButtonPressed = false;
  recordDisplay = '00:00:23';
  displayedColumns = ['date', 'startTime', 'endTime'];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private recordService: RecordService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProject();
    this.getTasks();
    this.getRecords();
  }

  onSelect(task: Task): void {
    if (!this.playButtonPressed && this.selectedTask === task) {
      this.selectedTask = null;
    } else if (!this.playButtonPressed) {
      this.selectedTask = task;
      console.log('Task selected');
      this.taskEmitter.emit(task);
      console.log('Task emitter sent.');
    }
  }

  getProject(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.projectService.getProject(id)
      .subscribe(project => this.project = project);
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
    this.tasks.forEach((task) => {
      if (task.project === this.project.id) {
        this.tasksOfProject.push(task);
      }
    });
  }

  getRecords(): void {
    this.recordService.getRecords()
      .subscribe(records => this.records = records);
    this.records.forEach((record) => {
      if (record.project === this.project.id && !record.task) {
        this.recordsOfProject.push(record);
      }
    });
  }

  getTasksNotCompleted(): Task[] {
    const tasksNotCompleted = [];
    this.tasksOfProject.forEach((task) => {
      if (!task.completed) {
        tasksNotCompleted.push(task);
      }
    });
    return tasksNotCompleted;
  }

  getTasksCompleted(): Task[] {
    const tasksCompleted = [];
    this.tasksOfProject.forEach((task) => {
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
