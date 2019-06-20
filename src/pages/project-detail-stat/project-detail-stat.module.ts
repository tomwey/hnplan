import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailStatPage } from './project-detail-stat';

@NgModule({
  declarations: [
    ProjectDetailStatPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailStatPage),
  ],
})
export class ProjectDetailStatPageModule {}
