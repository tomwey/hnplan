import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FeedbackDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-detail',
  templateUrl: 'feedback-detail.html',
})
export class FeedbackDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FeedbackDetailPage');
  }

  data: any = [
    {
      label: '计划名称',
      value: '计划管理系统APP端项目计划统计功能开发完成'
    },
    {
      label: '计划类型',
      value: '职能计划'
    },
    {
      label: '计划完成时间',
      value: '2019-07-09'
    },
    {
      label: '反馈时间',
      value: '2019-07-09'
    },
    {
      label: '完成进度',
      value: '50%'
    },
    {
      label: '相关计划',
      value: '系统APP端项目计划统计功能开发完成'
    },
    {
      label: '风险等级',
      value: '高风险'
    },
    {
      label: '反馈说明',
      value: '这是反馈说明，这是反馈说明，这是反馈说明，这是反馈说明，这是反馈说明，这是反馈说明，'
    },
    {
      label: '反馈附件',
      value: ''
    }
  ];

  data2: any = [
    {
      name: '关于珍宝琥珀三期绿化太少的问题，要让专人去抓一下',
      mannames: '张超,王超,李超'
    },
    {
      name: '关于珍宝琥珀三期绿化太少的问题，要让专人去抓一下',
      mannames: '张超,王超,李超'
    },
    {
      name: '关于珍宝琥珀三期绿化太少的问题，要让专人去抓一下',
      mannames: '张超,王超,李超'
    },
    {
      name: '关于珍宝琥珀三期绿化太少的问题，要让专人去抓一下',
      mannames: '张超,王超,李超'
    },
  ];

}
