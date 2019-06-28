import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RelatedPlanSearchPage } from './related-plan-search';

@NgModule({
  declarations: [
    RelatedPlanSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(RelatedPlanSearchPage),
  ],
})
export class RelatedPlanSearchPageModule {}
