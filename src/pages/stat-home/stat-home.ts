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

    var planBar = ECharts.init(document.getElementById('plan-graph') as HTMLDivElement);
    var option2 = {
      legend: {
        data: ['总计划', '完成计划', '预警计划', '计划完成率']
      },
      color: ['rgb(80,108,162)', 'rgb(155,210,60)', 'rgb(231,90,22)', 'rgb(155,210,60)'],
      xAxis: [
        {
          type: 'category',
          data: ['总裁交办', '职能计划', '项目计划', '专项计划'],
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '计划数',
          min: 0,
          max: 130,
          interval: 10,
          axisLabel: {
            formatter: '{value} ml'
          },
          show: false
        },
        {
          type: 'value',
          name: '完成率',
          min: 0,
          max: 100,
          interval: 10,
          axisLabel: {
            formatter: '{value}%'
          },
          show: false
        }
      ],
      series: [
        {
          name: '总计划',
          type: 'bar',
          data: [35, 122, 78, 15],
          barMaxWidth: '15%',
          barGap: '60%',
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          name: '完成计划',
          type: 'bar',
          data: [20, 90, 18, 5],
          barMaxWidth: '15%',
          barGap: '60%',
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          name: '预警计划',
          type: 'bar',
          data: [5, 32, 23, 10],
          barMaxWidth: '15%',
          barGap: '60%',
          label: {
            show: true,
            position: 'top'
          }
        },
        {
          name: '计划完成率',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          data: [59, 70, 26, 33],
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }
      ]
    };
    planBar.setOption(option2);
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
