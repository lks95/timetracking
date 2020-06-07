import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/project/project.component';
import {CreateProjectDialog} from './components/dialogs/create-project/create-project.dialog';

import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider'
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CommonModule} from '@angular/common';

import { DatePipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    CreateProjectDialog,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
