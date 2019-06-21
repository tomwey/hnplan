import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackListPage } from './feedback-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    FeedbackListPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackListPage),
    ComponentsModule
  ],
})
export class FeedbackListPageModule { }
