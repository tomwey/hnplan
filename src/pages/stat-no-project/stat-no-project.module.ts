import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatNoProjectPage } from './stat-no-project';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StatNoProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(StatNoProjectPage),
    ComponentsModule
  ],
})
export class StatNoProjectPageModule { }
