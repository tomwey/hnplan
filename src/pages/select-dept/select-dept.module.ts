import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectDeptPage } from './select-dept';

@NgModule({
  declarations: [
    SelectDeptPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectDeptPage),
  ],
})
export class SelectDeptPageModule {}
