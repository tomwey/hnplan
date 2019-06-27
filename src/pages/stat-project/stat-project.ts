import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, ModalController } from 'ionic-angular';
import ECharts from 'echarts';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';

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

  @ViewChild('myCharts') myCharts: ElementRef;

  dataType: number = 0;
  dataTypes: any = [
    '我的计划统计',
    '部门计划统计'
  ];

  filterItems: any = [
  ];

  globalConds: any = {};

  planList: any = [

  ];

  totalPieChart: any = null;

  totalStat: any = {};

  // globalConds: any = {};

  projects: any = [];

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: ApiService,
    private tools: Tools,
    public navParams: NavParams) {
    this.dataType = this.navParams.data.dataType;
    this.filterItems = this.navParams.data.filters;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatProjectPage');
    // setTimeout(() => {
    // this.createGraph();
    // }, 300);

  }

  ionViewDidEnter() {
    // this.createGraph();
  }

  getDigitValue(stat, key) {
    let val = (stat[key] || 0).toString().replace('NULL', 0);
    // console.log(stat);
    return parseInt(val);
  }

  createGraph(data) {
    // var myChart = ECharts.init(document.getElementById('top-graphic') as HTMLDivElement);
    if (!this.totalPieChart) {
      this.totalPieChart = ECharts.init(this.myCharts.nativeElement);
    }

    let done = this.getDigitValue(this.totalStat, 'plantotalovernum');
    let undone = this.getDigitValue(this.totalStat, 'plantotalnum') - this.getDigitValue(this.totalStat, 'plantotalovernum');

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

    // 使用刚指定的配置项和数据显示图表。
    this.totalPieChart.setOption(option);
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  segmentChanged(ev) {
    this.loadAll();
  }

  selectProject(proj) {
    this.navCtrl.push('ProjectDetailStatPage', { item: proj, conds: this.globalConds, title: `${proj.project_name}计划分析`, data_type: this.dataType === 0 ? '1' : '2' });
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

  loadTotalStats() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '1',
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
        // console.log(data);
        if (data && data['data']) {
          if (data['data'].length > 0) {
            this.totalStat = data['data'][0];
          }
        } else {
          this.totalStat = {};
        }
        this.createGraph(data['data']);
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  loadTotalProjects() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划统计APP',
      param1: '3',
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
        // console.log(data);
        if (data && data['data']) {
          this.projects = data['data'];
        }
        // this.createGraph(data['data']);
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
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
    this.loadTotalStats();
    this.loadTotalProjects();
    this.loadWarningPlans();
  }

  itemsChange() {
    this.calcConds();
    this.loadAll();
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

  gotoBottom() {
    let el = document.getElementById('fx-plans');
    this.content.scrollTo(0, el.offsetTop, 800);
  }

}
