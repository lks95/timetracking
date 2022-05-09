import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // Example projects route
  // {
  //   path: '/projects',
  //   component: ProjectsComponent,
  // },
  // TODO When /projects implemented, redirect to it by default (to act as a dashboard / starting page)
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
