import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatHomePage } from './stat-home';

@NgModule({
  declarations: [
    StatHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StatHomePage),
  ],
})
export class StatHomePageModule {}
