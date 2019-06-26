import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';

import ECharts from 'echarts';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';

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

  totalPlans: number = 0;

  filterItems: any = [];

  globalConds: any = {};

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

  ];

  currentOpt: any = '4';
  options: any = [
    {
      label: '按级别',
      value: '4'
    },
    {
      label: '按来源',
      value: '7'
    },
    {
      label: '按项目',
      value: '3'
    },
  ];

  statePieChart: any = null;
  warningPieChart: any = null;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: ApiService,
    public navParams: NavParams) {
    this.dataType = this.navParams.data.dataType;
    this.filterItems = this.navParams.data.filters;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatNoProjectPage');
    // this.createGraph1();

    // this.createGraph2();
  }

  calcConds() {
    let planType = '0', project = '0', planLevel = '0', start = '', end = '';
    this.filterItems.forEach(item => {
      if (item.type == 'plan_type') {
        planType = item.value;
      } else if (item.type == 'plan_level') {
        planLevel = item.value;
      } else if (item.type == 'project') {
        project = item.value;
      } else if (item.type == 'date') {
        if (item.name == '本月') {
          var date = new Date();
          date.setDate(1);
          start = Utils.dateFormat(date);
          date.setMonth(date.getMonth() + 1);
          date.setDate(0);
          end = Utils.dateFormat(date);
        } else if (item.name == '本季') {
          var now = new Date();
          var quarter = Math.floor((now.getMonth() / 3));
          var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
          var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
          start = Utils.dateFormat(firstDate);
          end = Utils.dateFormat(endDate);
        } else if (item.name == '本年') {
          var first = new Date(new Date().getFullYear(), 0, 1);
          var last = new Date(new Date().getFullYear(), 11, 31);
          start = Utils.dateFormat(first);
          end = Utils.dateFormat(last);
        }
      }
    });
    this.globalConds = {
      plan_type: planType,
      project: project,
      plan_level: planLevel,
      start: start,
      end: end
    };
  }

  loadStatePlanStats() {

    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '5',
      param2: '',
      param3: this.globalConds.plan_type || '0',
      param4: this.globalConds.project || '0',
      param5: this.globalConds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.globalConds.start,
      param9: this.globalConds.end,
      param10: this.dataType == 0 ? '1' : '2',
      param11: Utils.getManID(),
      param12: '1'
    })
      .then(data => {
        // console.log('状态：', data);
        if (data && data['data']) {
          this.createGraph1(data['data']);
        }
      })
      .catch(error => {

      });
  }

  loadWarningPlanStats() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '6',
      param2: '',
      param3: this.globalConds.plan_type || '0',
      param4: this.globalConds.project || '0',
      param5: this.globalConds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.globalConds.start,
      param9: this.globalConds.end,
      param10: this.dataType == 0 ? '1' : '2',
      param11: Utils.getManID(),
      param12: '1'
    })
      .then(data => {
        // console.log('风险：', data);
        if (data && data['data']) {
          this.createGraph2(data['data']);
        }
      })
      .catch(error => {

      });
  }

  loadOtherPlanStats() {
    this.plans = [];
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: this.currentOpt,
      param2: '',
      param3: this.globalConds.plan_type || '0',
      param4: this.globalConds.project || '0',
      param5: this.globalConds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.globalConds.start,
      param9: this.globalConds.end,
      param10: this.dataType == 0 ? '1' : '2',
      param11: Utils.getManID(),
      param12: '1'
    })
      .then(data => {
        console.log('其他：', data);
        if (data && data['data']) {
          this.plans = data['data'];
        }
      })
      .catch(error => {

      });
  }

  loadWarningPlans() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划明细APP',
      param1: '', // 关键字搜索
      param2: this.globalConds.plan_type || '0', // 计划类型
      param3: this.globalConds.project || '0', // 项目
      param4: this.globalConds.plan_level || '0', // 计划级别 
      param5: '高', // 风险等级
      param6: '', // 完成状态
      param7: this.globalConds.start, // 开始日期
      param8: this.globalConds.end, // 结束日期
      param9: this.dataType == 0 ? '1' : '2', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1'
    })
      .then(data => {
        console.log(data);
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

  loadAll() {
    this.loadStatePlanStats();
    this.loadWarningPlanStats();
    this.loadOtherPlanStats();
    this.loadWarningPlans();
  }

  gotoPlanList(type) {
    let obj = Object.assign({}, this.globalConds);
    obj['data_type'] = this.dataType == 0 ? '1' : '2';
    this.navCtrl.push('PlanListPage', obj);
  }

  // 状态图标
  createGraph1(data) {
    if (!this.statePieChart) {
      this.statePieChart = ECharts.init(document.getElementById('state-graph') as HTMLDivElement);
    }

    let legData = [];
    let value = {};
    let sdata = [];
    let sum = 0;
    data.forEach(ele => {
      legData.push(ele.overdesc);
      sdata.push({ value: ele.totalnum, name: ele.overdesc });
      value[ele.overdesc] = ele.totalnum;
      sum += parseInt(ele.totalnum);
    });
    this.totalPlans = sum;
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: ''
      },
      legend: {
        orient: 'vertical',
        right: 30,
        top: 72,
        data: legData,
        formatter: (name) => {
          return `${name} ${value[name]}`;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['40%', '50%'],
        center: ['30%', '50%'],
        silent: true,
        data: sdata,
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
    this.statePieChart.setOption(option);
  }

  createGraph2(data) {
    if (!this.warningPieChart) {
      this.warningPieChart = ECharts.init(document.getElementById('fx-graph') as HTMLDivElement);
    }

    let legData = [];
    let value = {};
    let sdata = [];
    data.forEach(ele => {
      let name = !ele.riskgrade || ele.riskgrade == 'NULL' ? '无风险' : ele.riskgrade + '风险';
      legData.push(name);
      sdata.push({ value: ele.totalnum, name: name });
      value[name] = ele.totalnum;
    });

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: ''
      },
      legend: {
        orient: 'vertical',
        right: 30,
        top: 72,
        data: legData,
        formatter: (name) => {
          return `${name} ${value[name]}`;
        }
      },
      series: [{
        name: '',
        type: 'pie',
        radius: ['40%', '50%'],
        center: ['30%', '50%'],
        silent: true,
        data: sdata,
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
    this.warningPieChart.setOption(option);
  }

  selectOption(opt) {
    this.currentOpt = opt.value;
    this.loadOtherPlanStats();
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
    this.loadAll();
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
    this.calcConds();
    this.loadAll();
  }

  gotoBottom() {
    let el = document.getElementById('fx-plans');
    this.content.scrollTo(0, el.offsetTop, 800);
  }

}
