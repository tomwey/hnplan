import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUrge: EventEmitter<any> = new EventEmitter();
  @Output() onFullScape: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  doClick(sliding) {
    this.onUrge.emit(this.item);
    sliding.close();
  }

  doClick2(sliding) {
    this.onFullScape.emit(this.item);
    sliding.close();
  }

  doTap() {
    this.onSelect.emit(this.item);
  }

}
