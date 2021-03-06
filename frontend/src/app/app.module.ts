import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectComponent} from './components/project/project.component';
import {TasklistComponent} from './components/project/tasklist/tasklist.component';
import {RecordlistComponent} from './components/project/recordlist/recordlist.component';

import {CreateProjectDialog} from './components/dialogs/create-project/create-project.dialog';
import {EditProjectDialog} from './components/dialogs/edit-project/edit-project.dialog';
import {CreateTaskDialog} from './components/dialogs/create-task/create-task.dialog';
import {EditTaskDialog} from './components/dialogs/edit-task/edit-task.dialog';
import {CreateRecordDialog} from './components/dialogs/create-record/create-record.dialog';
import {EditRecordDialog} from './components/dialogs/edit-record/edit-record.dialog';

import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule, DatePipe, SlicePipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    TasklistComponent,
    RecordlistComponent,
    CreateProjectDialog,
    EditProjectDialog,
    CreateTaskDialog,
    EditTaskDialog,
    CreateRecordDialog,
    EditRecordDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CommonModule,
    MatGridListModule
  ],
  providers: [DatePipe, SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
