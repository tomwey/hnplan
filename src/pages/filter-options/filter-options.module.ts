import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterOptionsPage } from './filter-options';

@NgModule({
  declarations: [
    FilterOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterOptionsPage),
  ],
})
export class FilterOptionsPageModule {}
