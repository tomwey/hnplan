import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';

import ECharts from 'echarts';

/**
 * Generated class for the StatProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-project',
  templateUrl: 'stat-project.html',
})
export class StatProjectPage {

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
      name: '三级',
      closable: true
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

  projects: any = [{}, {}, {}, {}, {}, {}, {}];

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatProjectPage');
    // setTimeout(() => {
    this.createGraph();
    // }, 300);

  }

  createGraph() {
    var myChart = ECharts.init(document.getElementById('top-graphic') as HTMLDivElement);
    // console.log(myChart);
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

  segmentChanged(ev) {

  }

  selectProject(proj) {
    this.navCtrl.push('ProjectDetailStatPage');
  }

  openFilter() {
    let modal = this.modalCtrl.create('FilterOptionsPage');
    modal.onDidDismiss((res) => {

    });
    modal.present();
  }

  itemsChange() { }

  gotoBottom() {
    let el = document.getElementById('fx-plans');
    this.content.scrollTo(0, el.offsetTop, 800);
  }

}
