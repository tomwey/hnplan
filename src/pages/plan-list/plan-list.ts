import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-list',
  templateUrl: 'plan-list.html',
})
export class PlanListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlanListPage');
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  planList: any = [
    {
      type: 1,
      typename: '职能计划',
      can_cb: true,
      level: '四级',
      name: '计划管理系统APP端功能规划初稿',
      source: '部门内部',
      projectname: '集团管理类'
    },
    {
      type: 2,
      typename: '项目计划',
      can_cb: true,
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类'
    },
    {
      type: 3,
      typename: '专项计划',
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类'
    }
  ];

}
