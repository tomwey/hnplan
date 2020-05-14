import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaStatsPage } from './area-stats';

@NgModule({
  declarations: [
    AreaStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(AreaStatsPage),
  ],
})
export class AreaStatsPageModule {}
