import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectReleatedPlansPage } from './select-releated-plans';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SelectReleatedPlansPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectReleatedPlansPage),
    ComponentsModule
  ],
})
export class SelectReleatedPlansPageModule { }
