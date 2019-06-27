import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatHomePage } from './stat-home';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StatHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StatHomePage),
    ComponentsModule
  ],
})
export class StatHomePageModule { }
