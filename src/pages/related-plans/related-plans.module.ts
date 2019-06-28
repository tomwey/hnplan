import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatedPlansPage } from './related-plans';

@NgModule({
  declarations: [
    RelatedPlansPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatedPlansPage),
  ],
})
export class RelatedPlansPageModule {}
