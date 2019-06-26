import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

/**
 * Generated class for the PlanDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var HNJSBridge;

@IonicPage()
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
})
export class PlanDetailPage {

  dataTypes: any = ['基本信息', '反馈记录'];
  dataType: number = 0;

  msg: any = null;

  plan: any = {};

  constructor(public navCtrl: NavController,
    // private events: Events,
    private zone: NgZone,
    public navParams: NavParams) {

    let object = Object.assign({}, this.navParams.data);
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        let element = (object[key] || '').toString();
        element = element.replace('NULL', '无');
        let arr = element.split('T');
        if (arr.length > 0) {
          element = arr[0];
        }
        this.plan[key] = element;
      }
    }

    this.data = [
      {
        label: '计划来源',
        value: this.plan.plansource
      },
      {
        label: '计划类型',
        value: this.plan.plantypename
      },
      {
        label: '项目名称',
        value: this.plan.projectname
      },
      {
        label: '计划名称',
        value: this.plan.itemname
      },
      {
        label: '计划层级',
        value: this.plan.plangrade
      },
      {
        label: '责任部门',
        value: this.plan.liabledeptname
      },
      {
        label: '第一责任人',
        value: this.plan.liablemanname
      },
      {
        label: '第二责任人',
        value: this.plan.otherliablemannamelist
      },
      {
        label: '经办人',
        value: this.plan.domanname
      },
      {
        label: '计划开始日期',
        value: this.plan.planbegindate
      },
      {
        label: '计划结束日期',
        value: this.plan.planoverdate
      },
      {
        label: '实际完成日期',
        value: this.plan.actualoverdate
      },
      {
        label: '计划状态',
        value: '已完成'
      },
    ];
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlanDetailPage');
  }

  segmentChanged(ev) {

  }

  gotoFeedbackList() {
    this.navCtrl.push('FeedbackListPage', this.plan);
  }

  doClick(type) {
    switch (type) {
      case 1:
        {
          // 变更
          let that = this;
          HNJSBridge.invoke(null, { foo: 'bar' }, function (msg) {
            alert(msg);
          });
        }
        break;
      case 2:
        {
          // 进度反馈
          HNJSBridge.invoke('进度反馈', (msg) => {

          });
        }
        break;
      case 3:
        {
          // 完成确认
          HNJSBridge.invoke('完成确认', (msg) => {

          });
        }
        break;
      default:
        break;
    }
  }
  openFlow(item) {

  }

  data: any = [];

}
