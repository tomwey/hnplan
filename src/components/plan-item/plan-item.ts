import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';

declare var HNJSBridge;

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
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUrge: EventEmitter<any> = new EventEmitter();
  @Output() onFullScape: EventEmitter<any> = new EventEmitter();
  constructor(private app: App) {
    // console.log('Hello PlanItemComponent Component');
    // this.text = 'Hello World';
  }

  doClick(sliding) {
    // this.onUrge.emit(this.item);
    sliding.close();
    HNJSBridge.invoke('urge', this.item, (msg) => {

    });
  }

  parseDate(dateStr) {
    let date = new Date(dateStr);
    if (!date) return '--';
    return date.getDate();
  }

  parseYearMonth(dateStr) {
    let date = new Date(dateStr);
    if (!date) return '--年--月';
    return `${date.getFullYear()}年${date.getMonth() + 1}月`;
  }

  doClick2(sliding) {
    this.onFullScape.emit(this.item);
    sliding.close();
  }

  doTap() {
    this.onSelect.emit(this.item);
  }

}
