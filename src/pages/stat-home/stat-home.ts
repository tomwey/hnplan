import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';

import ECharts from 'echarts';

/**
 * Generated class for the StatHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-home',
  templateUrl: 'stat-home.html',
})
export class StatHomePage {

  dataType: number = 0;
  dataTypes: any = [
    '我的计划统计',
    '部门计划统计'
  ];
  dateTypes: any = ['本月', '本季', '本年'];
  currentType: number = 0;

  constructor(public navCtrl: NavController,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatHomePage');
    var myChart = ECharts.init(document.getElementById('top-graphic') as HTMLDivElement);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: ''
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['60%', '62%'],
        silent: true,
        data: [
          { value: 132, name: '已完成计划' },
          { value: 290, name: '未完成计划' }
        ],
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },

        },
      }],
      color: ['rgb(231,90,22)', 'rgb(159,159,159)'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  // ionViewDidEnter() {

  // }

  segmentChanged(ev) {

  }

  selectDate(t) {
    this.currentType = t;
  }

  togglePlan() {
    this.app.getRootNavs()[0].setRoot(HomePage);
  }

}
