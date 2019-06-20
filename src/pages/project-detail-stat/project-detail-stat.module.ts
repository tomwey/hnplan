import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailStatPage } from './project-detail-stat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ProjectDetailStatPage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailStatPage),
    ComponentsModule
  ],
})
export class ProjectDetailStatPageModule { }
