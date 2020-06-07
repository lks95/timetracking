import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectsComponent} from './components/projects/projects.component';

const routes: Routes = [
  // Example projects route
  {
    path: 'projects',
    component: ProjectsComponent,

  },
  //{ path: 'projects/:id', component: projectComponent },
  // TODO When /projects implemented, redirect to it by default (to act as a dashboard / starting page)
  { path: '**', redirectTo: 'projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
