import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
})
export class PlanDetailPage {

  dataTypes: any = ['基本信息', '反馈记录'];
  dataType: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlanDetailPage');
  }

  segmentChanged(ev) {

  }

  gotoFeedbackList() {
    this.navCtrl.push('FeedbackListPage');
  }

  doClick(type) {
    switch (type) {
      case 1:
        {
          // 变更
        }
        break;
      case 2:
        {
          // 进度反馈
        }
        break;
      case 3:
        {
          // 完成确认
        }
        break;
      default:
        break;
    }
  }
  openFlow(item) {

  }

  data: any = [
    {
      label: '计划来源',
      value: '部门内部'
    },
    {
      label: '计划类型',
      value: '职能计划'
    },
    {
      label: '项目名称',
      value: '集团管理类'
    },
    {
      label: '计划名称',
      value: '计划管理系统APP端项目计划统计功能开发完成—iOS'
    },
    {
      label: '计划层级',
      value: '四级'
    },
    {
      label: '责任部门',
      value: '运营'
    },
    {
      label: '第一责任人',
      value: '唐伟'
    },
    {
      label: '第二责任人',
      value: '无'
    },
    {
      label: '经办人',
      value: '唐伟'
    },
    {
      label: '计划开始日期',
      value: '2019-06-20'
    },
    {
      label: '计划结束日期',
      value: '2019-06-24'
    },
    {
      label: '实际完成日期',
      value: '无'
    },
    {
      label: '计划状态',
      value: '已完成'
    },
  ];

}
