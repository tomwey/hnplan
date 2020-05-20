import { NgModule } from '@angular/core';
import { AccordionListComponent } from './accordion-list/accordion-list';
import { IonicPageModule } from 'ionic-angular/module';
import { PipesModule } from '../pipes/pipes.module';
import { CallPhoneComponent } from './call-phone/call-phone';
import { FilterItemsComponent } from './filter-items/filter-items';
import { PlanItemComponent } from './plan-item/plan-item';
import { PlanItem2Component } from './plan-item2/plan-item2';
import { FeedbackTimelineComponent } from './feedback-timeline/feedback-timeline';
import { CustomMonthPickerComponent } from './custom-month-picker/custom-month-picker';
import { ExpandableComponent } from './expandable/expandable';
import { FilterBarComponent } from './filter-bar/filter-bar';

@NgModule({
    declarations: [AccordionListComponent,
        CallPhoneComponent,
        FilterItemsComponent,
    PlanItemComponent,
    PlanItem2Component,
    FeedbackTimelineComponent,
    CustomMonthPickerComponent,
    ExpandableComponent,
    FilterBarComponent],
    imports: [IonicPageModule.forChild([AccordionListComponent]), PipesModule],
    exports: [AccordionListComponent,
        CallPhoneComponent,
        FilterItemsComponent,
    PlanItemComponent,
    PlanItem2Component,
    FeedbackTimelineComponent,
    CustomMonthPickerComponent,
    ExpandableComponent,
    FilterBarComponent]
})
export class ComponentsModule { }
