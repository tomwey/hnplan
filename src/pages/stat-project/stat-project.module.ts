import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatProjectPage } from './stat-project';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StatProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(StatProjectPage),
    ComponentsModule
  ],
})
export class StatProjectPageModule { }
