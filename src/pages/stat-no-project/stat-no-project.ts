import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';

import ECharts from 'echarts';

/**
 * Generated class for the StatNoProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-no-project',
  templateUrl: 'stat-no-project.html',
})
export class StatNoProjectPage {

  @ViewChild(Content) content: Content;

  dataType: number = 0;
  dataTypes: any = [
    '我的计划统计',
    '部门计划统计'
  ];

  filterItems: any = [
    {
      name: '本月',
      closable: false
    },
    {
      name: '总裁交办',
      closable: true
    },
    {
      name: '枫丹西悦二期',
      closable: true
    },
    {
      name: '3级计划',
      closable: true
    },
  ];

  plans: any = [
    {
      name: '3级计划',
      progress: 56.4,
      done: 34,
      total: 65
    },
    {
      name: '4级计划',
      progress: 72,
      done: 54,
      total: 85
    },
  ];

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

  currentOpt: any = '1';
  options: any = [
    {
      label: '按级别',
      value: '1'
    },
    {
      label: '按来源',
      value: '2'
    },
    {
      label: '按项目',
      value: '3'
    },
  ];

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatNoProjectPage');
    this.createGraph1();

    this.createGraph2();
  }

  gotoPlanList(type) {
    this.navCtrl.push('PlanListPage');
  }

  createGraph1() {
    var myChart = ECharts.init(document.getElementById('state-graph') as HTMLDivElement);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: ''
      },
      legend: {
        orient: 'vertical',
        right: 30,
        top: 72,
        data: ['到期未完成', '未到期', '已超期', '已完成'],
        formatter: (name) => {
          return `${name} 30`;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['40%', '50%'],
        center: ['30%', '50%'],
        silent: true,
        data: [
          { value: 15, name: '到期未完成' },
          { value: 15, name: '未到期' },
          { value: 35, name: '已超期' },
          { value: 15, name: '已完成' }
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
      color: ['rgb(225,164,53)', 'rgb(100,142,223)', 'rgb(177,52,33)', 'rgb(155,210,60)'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  createGraph2() {
    var myChart = ECharts.init(document.getElementById('fx-graph') as HTMLDivElement);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: ''
      },
      legend: {
        orient: 'vertical',
        right: 30,
        top: 72,
        data: ['高风险', '中风险', '低风险', '无风险'],
        formatter: (name) => {
          return `${name} 30`;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['40%', '50%'],
        center: ['30%', '50%'],
        silent: true,
        data: [
          { value: 35, name: '低风险' },
          { value: 5, name: '中风险' },
          { value: 5, name: '高风险' },
          { value: 15, name: '无风险' }
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
      color: ['rgb(225,164,53)', 'rgb(100,142,223)', 'rgb(177,52,33)', 'rgb(155,210,60)'],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }

  selectOption(opt) {
    this.currentOpt = opt.value;
  }

  openFilter() {
    let modal = this.modalCtrl.create('FilterOptionsPage', this.filterItems);
    modal.onDidDismiss((res) => {
      if (res) {
        this.filterItems = Object.assign([], res);
      }
    });
    modal.present();
  }

  segmentChanged(ev) {

  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  itemsChange() {
    // console.log(this.filterItems);
  }

  gotoBottom() {
    let el = document.getElementById('fx-plans');
    this.content.scrollTo(0, el.offsetTop, 800);
  }

}
