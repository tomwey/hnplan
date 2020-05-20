import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AreaStatsPage } from "./area-stats";
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [AreaStatsPage],
  imports: [IonicPageModule.forChild(AreaStatsPage), ComponentsModule],
})
export class AreaStatsPageModule {}
