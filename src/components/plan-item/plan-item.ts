import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from 'ionic-angular';
import { Utils } from '../../provider/Utils';

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
    HNJSBridge.invoke('plan:urge', this.item, (msg) => {

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

  calcState(item) {
    if (item.isover) {
      return 'success';
    } else {
      if (item.cal_over_desc == '取消') {
        return 'danger';
      }

      if (item.cal_over_desc == '未到期') {
        return 'pending';
      }

      if (item.cal_over_desc == '超期未完') {
        return 'danger';
      }

      return 'approve';
    }
  }

  calcDaysBetween(d1, d2) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(d1);
    var secondDate = new Date(d2);

    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    return diffDays;
  }

  calcResult(item) {
    if (item.cal_over_desc == '取消') {
      return { label: '已取消', value: '' };
    }

    if (item.cal_over_desc == '未到期') {
      let days = this.calcDaysBetween(Utils.dateFormat(new Date()), item.planoverdate);
      if (days > 0) {
        return { label: '还剩', value: days };
      } else {
        return { label: '不到', value: '1' };
      }
    }

    if (item.cal_over_desc == '超期未完') {
      let days = this.calcDaysBetween(Utils.dateFormat(new Date()), item.planoverdate);
      if (days > 0) {
        return { label: '超期', value: days };
      } else {
        return { label: '不到', value: '1' };
      }
    }

    if (item.cal_over_desc == '按时完成') {
      return { label: '按期', value: '完成' };
    }
    if (item.cal_over_desc == '提前完成') {
      let days = this.calcDaysBetween(item.actualoverdate, item.planoverdate);
      if (days > 0) {
        return { label: '提前', value: days };
      } else {
        return { label: '不到', value: '1' };
      }
    }

    if (item.cal_over_desc == '超期完成') {
      // return { label: '超期', value: '完成' };
      let days = this.calcDaysBetween(item.actualoverdate, item.planoverdate);
      if (days > 0) {
        return { label: '超期', value: days };
      } else {
        return { label: '不到', value: '1' };
      }
    }

    return {};
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
