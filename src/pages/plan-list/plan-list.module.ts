import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanListPage } from './plan-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PlanListPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanListPage),
    ComponentsModule
  ],
})
export class PlanListPageModule { }
