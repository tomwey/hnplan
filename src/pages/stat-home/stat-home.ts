import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Content } from 'ionic-angular';
import { HomePage } from '../home/home';

import ECharts from 'echarts';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

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

  pieChart: any = null;
  barChart: any = null;

  planList: any = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private api: ApiService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatHomePage');
    this.iosFixed.fixedScrollFreeze(this.content);
    setTimeout(() => {
      this.loadPlanStats();
    }, 10);


    // this.createGraph();
  }

  getDigitValue(stat, key) {
    let val = (stat[key] || 0).toString().replace('NULL', 0);
    // console.log(stat);
    return parseInt(val);
  }

  loadWarningPlans(start, end) {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划明细APP',
      param1: '', // 关键字搜索
      param2: '0', // 计划类型
      param3: '0', // 项目
      param4: '0', // 计划级别 
      param5: '高', // 风险等级
      param6: '', // 完成状态
      param7: start, // 开始日期
      param8: end, // 结束日期
      param9: this.dataType == 0 ? '1' : '2', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1'
    })
      .then(data => {
        // console.log(data);
        if (data['data']) {
          this.planList = data['data'];
        }

        // this.error = this.planList.length === 0 ? '暂无计划事项' : null;
      })
      .catch(error => {
        // console.log(error);
        // this.error = error.message || '服务器超时';
      });
  }

  gotoBottom() {
    let el = document.getElementById('fx-plans');
    this.content.scrollTo(0, el.offsetTop, 800);
  }

  showDetailGraph() {
    this.navCtrl.push('StatNoProjectPage',
      {
        dataType: this.dataType,
        filters: [
          { name: this.dateTypes[this.currentType], value: this.currentType + 1, closable: false, type: 'date' },
          // { name: itemName, value: planId || '0', closable: true, type: 'plan_type' }
        ]
      });
  }

  showPlans(type) {
    let start = '', end = '';
    if (this.currentType === 0) {
      // 本月
      var date = new Date();
      date.setDate(1);
      start = Utils.dateFormat(date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      end = Utils.dateFormat(date);
    } else if (this.currentType === 1) {
      // 本季
      var now = new Date();
      var quarter = Math.floor((now.getMonth() / 3));
      var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
      var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
      start = Utils.dateFormat(firstDate);
      end = Utils.dateFormat(endDate);
    } else if (this.currentType === 2) {
      // 本年
      var first = new Date(new Date().getFullYear(), 0, 1);
      var last = new Date(new Date().getFullYear(), 11, 31);
      start = Utils.dateFormat(first);
      end = Utils.dateFormat(last);
    }
    let conds = {
      'keyword': '',
      'project': '0',
      'plan_type': '0',
      'plan_level': '0',
      'fx_level': '',
      'done_state': '',
      'start': start,
      'end': end,
      'data_type': this.dataType == 0 ? '1' : '2'
    };
    if (type == 1) {
      // 今天
      conds['start'] = Utils.dateFormat(new Date());
      conds['end'] = Utils.dateFormat(new Date());
    } else if (type == 2) {
      // 超期
      conds['done_state'] = '超期未完';
    } else if (type == 3) {
      // 预警
      conds['fx_level'] = '高';
    }
    this.navCtrl.push('PlanListPage', conds);
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  createGraph1() {
    let done = this.getDigitValue(this.totalStat, 'plantotalovernum');
    let undone = this.getDigitValue(this.totalStat, 'plantotalnum') - this.getDigitValue(this.totalStat, 'plantotalovernum');

    if (!this.pieChart) {
      this.pieChart = ECharts.init(document.getElementById('top-graphic') as HTMLDivElement);
    }
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
      this.pieChart.setOption(option);
    } else {
      this.pieChart.setOption(null);
    }
  }

  createGraph2(data) {
    // overnum: "0"
    // overrate: "0.00"
    // plantypeid: "1030"
    // plantypename: "总裁交办"
    // totalnum: "4"
    // warningnum: "0"
    let xAxisData = [];
    let maxVal = 0;
    let totalPlans = [];
    let overPlans = [];
    let warningPlans = [];
    let planRates = [];
    data.forEach(ele => {
      xAxisData.push(ele.plantypename);
      let total = parseInt((ele.totalnum || '0').replace('NULL', '0'));
      let over = parseInt((ele.overnum || '0').replace('NULL', '0'));
      let warning = parseInt((ele.warningnum || '0').replace('NULL', '0'));
      maxVal = Math.max(maxVal, total, over, warning);
      totalPlans.push(total);
      overPlans.push(over);
      warningPlans.push(warning);
      planRates.push(parseFloat((ele.overrate || '0.00').replace('NULL', '0.00')));
    });
    if (!this.barChart) {
      this.barChart = ECharts.init(document.getElementById('plan-graph') as HTMLDivElement);
      this.barChart.on('click', (params) => {
        // console.log(params);
        let itemName = null;
        if (params.componentType == 'series') {
          itemName = params.name;
        } else if (params.componentType == 'xAxis') {
          itemName = params.value;
        }

        let planId = null;
        for (let i = 0; i < data.length; i++) {
          let item = data[i];
          if (item.plantypename === itemName) {
            planId = item.plantypeid;
            break;
          }
        }

        if (itemName == '项目计划') {
          this.navCtrl.push('StatProjectPage', {
            dataType: this.dataType,
            filters: [
              { name: this.dateTypes[this.currentType], value: this.currentType + 1, closable: false, type: 'date' },
              { name: itemName, value: planId || '0', closable: true, type: 'plan_type' }
            ]
          });
        } else {

          this.navCtrl.push('StatNoProjectPage',
            {
              dataType: this.dataType,
              filters: [
                { name: this.dateTypes[this.currentType], value: this.currentType + 1, closable: false, type: 'date' },
                { name: itemName, value: planId || '0', closable: true, type: 'plan_type' }
              ]
            });
        }
      });
    }

    var option2: any = {
      legend: {
        data: ['总计划', '完成计划', '预警计划', '计划完成率']
      },
      color: ['rgb(80,108,162)', 'rgb(155,210,60)', 'rgb(231,90,22)', 'rgb(155,210,60)'],
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          triggerEvent: true,
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '计划数',
          min: 0,
          max: maxVal,
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
          data: totalPlans,
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
          data: overPlans,
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
          data: warningPlans,
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
          data: planRates,
          label: {
            show: true,
            position: 'top',
            formatter: '{c}%'
          }
        }
      ]
    };
    this.barChart.setOption(option2);
  }

  loadPlanStats() {
    let start = '', end = '';
    if (this.currentType === 0) {
      // 本月
      var date = new Date();
      date.setDate(1);
      start = Utils.dateFormat(date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      end = Utils.dateFormat(date);
    } else if (this.currentType === 1) {
      // 本季
      var now = new Date();
      var quarter = Math.floor((now.getMonth() / 3));
      var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
      var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
      start = Utils.dateFormat(firstDate);
      end = Utils.dateFormat(endDate);
    } else if (this.currentType === 2) {
      // 本年
      var first = new Date(new Date().getFullYear(), 0, 1);
      var last = new Date(new Date().getFullYear(), 11, 31);
      start = Utils.dateFormat(first);
      end = Utils.dateFormat(last);
    }
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '1',
      param2: '',
      param3: '0',
      param4: '0',
      param5: '0',
      param6: '',
      param7: '',
      param8: start,
      param9: end,
      param10: this.dataType == 0 ? '1' : '2',
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
        this.createGraph1();
      })
      .catch(error => {
        // console.log(error);
      });
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '2',
      param2: '',
      param3: '0',
      param4: '0',
      param5: '0',
      param6: '',
      param7: '',
      param8: start,
      param9: end,
      param10: this.dataType == 0 ? '1' : '2',
      param11: Utils.getManID(),
      param12: '1'
    })
      .then(data => {
        // console.log(data);
        if (data['data']) {
          this.createGraph2(data['data']);
        }
        // this.createGraph2();
      })
      .catch(error => {
        // console.log(error);
      });

    this.loadWarningPlans(start, end);
  }

  segmentChanged(ev) {
    this.loadPlanStats();
  }

  selectDate(t) {
    this.currentType = t;
    this.loadPlanStats();
  }

  togglePlan() {
    this.app.getRootNavs()[0].setRoot(HomePage);
  }

}
