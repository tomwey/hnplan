import { Component, Input } from '@angular/core';

/**
 * Generated class for the PlanItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'plan-item',
  templateUrl: 'plan-item.html'
})
export class PlanItemComponent {

  @Input() item: any = {};

  constructor() {
    // console.log('Hello PlanItemComponent Component');
    // this.text = 'Hello World';
  }

  doClick(item, sliding) {
    sliding.close();
  }

}
