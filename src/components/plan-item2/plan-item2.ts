import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the PlanItem2Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

declare var HNJSBridge;

@Component({
  selector: 'plan-item2',
  templateUrl: 'plan-item2.html'
})
export class PlanItem2Component {

  @Input() item: any = {};
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUrge: EventEmitter<any> = new EventEmitter();
  @Output() onFullScape: EventEmitter<any> = new EventEmitter();

  constructor(private app: App) {

  }

  doClick(sliding) {
    // this.onUrge.emit(this.item);
    sliding.close();
    HNJSBridge.invoke('plan:urge', this.item, (msg) => {

    });
  }

  doClick2(sliding) {
    // this.onFullScape.emit(this.item);
    sliding.close();
    this.app.getRootNavs()[0].push('ProjectDetailStatPage', {
      item: this.item,
      title: `${this.item.project_name || this.item.projectname}全景计划`
    });

  }

  doTap() {
    this.onSelect.emit(this.item);
  }

}
