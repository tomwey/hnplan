import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';

import ECharts from 'echarts';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';

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

  totalStat: any = {};

  constructor(public navCtrl: NavController,
    private app: App,
    private api: ApiService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatHomePage');
    this.loadPlanStats();

    // this.createGraph();
  }

  getDigitValue(stat, key) {
    let val = (stat[key] || 0).toString().replace('NULL', 0);
    // console.log(stat);
    return parseInt(val);
  }

  createGraph() {
    let done = this.getDigitValue(this.totalStat, 'plantotalovernum');
    let undone = this.getDigitValue(this.totalStat, 'plantotalnum') - this.getDigitValue(this.totalStat, 'plantotalovernum');
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
          { value: done, name: '已完成计划' },
          { value: undone, name: '未完成计划' }
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

    // console.log(option);

    if (!(done == 0 && undone == 0)) {
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }

    var planBar = ECharts.init(document.getElementById('plan-graph') as HTMLDivElement);
    var option2: any = {
      legend: {
        data: ['总计划', '完成计划', '预警计划', '计划完成率']
      },
      color: ['rgb(80,108,162)', 'rgb(155,210,60)', 'rgb(231,90,22)', 'rgb(155,210,60)'],
      xAxis: [
        {
          type: 'category',
          data: ['总裁交办', '职能计划', '项目计划', '专项计划'],
          triggerEvent: true,
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
          show: false,
          triggerEvent: true,
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
          show: false,
          triggerEvent: true,
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
    planBar.on('click', (params) => {
      // console.log(params);
      let itemName = null;
      if (params.componentType == 'series') {
        itemName = params.name;
      } else if (params.componentType == 'xAxis') {
        itemName = params.value;
      }

      if (itemName == '项目计划') {
        this.navCtrl.push('StatProjectPage');
      } else {
        this.navCtrl.push('StatNoProjectPage');
      }
    });
  }

  loadPlanStats() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '',
      param2: '1',
      param3: '',
      param4: '0',
      param5: '0',
      param6: '0',
      param7: '0',
      param8: '',
      param9: '',
      param10: '1',
      param11: Utils.getManID(),
      param12: '1'
    })
      .then(data => {
        // console.log(data);
        if (data['data']) {
          if (data['data'].length > 0) {
            let item = data['data'][0];
            this.totalStat = item;
          }
        }
        this.createGraph();
      })
      .catch(error => {
        console.log(error);
      })
  }

  segmentChanged(ev) {

  }

  selectDate(t) {
    this.currentType = t;
  }

  togglePlan() {
    this.app.getRootNavs()[0].setRoot(HomePage);
  }

}
