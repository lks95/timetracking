import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { ProjectsComponent } from './components/projects/projects.component';

import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
