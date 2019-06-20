import { Component, Input } from '@angular/core';

/**
 * Generated class for the PlanItem2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'plan-item2',
  templateUrl: 'plan-item2.html'
})
export class PlanItem2Component {

  @Input() item: any = {};
  constructor() {

  }

}
