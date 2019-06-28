import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the SelectReleatedPlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-releated-plans',
  templateUrl: 'select-releated-plans.html',
})
export class SelectReleatedPlansPage {

  plans: any = [];
  isAll: boolean = false;

  filterItems: any = [
    { name: '本月', value: 1, closable: false, type: 'date' },
    { name: '部门计划', value: '2', closable: false, type: 'plan_data_type' }
  ];

  globalConds: any = {};

  constructor(public navCtrl: NavController,
    private api: ApiService,
    // private modalCtrl: ModalController,
    private tools: Tools,
    private events: Events,
    public navParams: NavParams) {
    this.events.subscribe('select.filters', (data) => {
      console.log(data);
      this.filterItems = Object.assign([], data);
    });

    // 本月
    let date = new Date();
    date.setDate(1);
    let start = Utils.dateFormat(date);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    let end = Utils.dateFormat(date);

    this.filterItems[0].start = start;
    this.filterItems[0].end = end;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SelectReleatedPlansPage');
  }

  calcConds() {
    let planType = '0', project = '0', planLevel = '0', planFXLevel = '', planDataType = '2', start = '', end = '';
    let keyword = '';
    this.filterItems.forEach(item => {
      if (item.type == 'plan_type') {
        planType = item.value;
      } else if (item.type == 'plan_level') {
        planLevel = item.value;
      } else if (item.type == 'project') {
        project = item.value;
      } else if (item.type == 'date') {
        start = item.start;
        end = item.end;
      } else if (item.type == 'plan_data_type') {
        planDataType = item.value;
      } else if (item.type == 'plan_fx_level') {
        planFXLevel = item.value;
      } else if (item.type == 'search') {
        keyword = item.value;
      }
    });
    this.globalConds = {
      plan_type: planType,
      project: project,
      plan_level: planLevel,
      plan_data_type: planDataType,
      plan_fx_level: planFXLevel,
      start: start,
      end: end,
      keyword: keyword
    };
  }

  openFilter() {
    this.navCtrl.push('RelatedPlanSearchPage', this.filterItems);
  }

  selectPlan(plan) {

  }

  selectAll() {

  }

  confirm() {

  }

  itemsChange() {
    this.calcConds();

    setTimeout(() => {
      this.loadWarningPlans();
    }, 50);
  }

  loadWarningPlans() {
    this.plans = [];
    this.tools.showLoading('正在加载');

    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划明细APP',
      param1: this.globalConds.keyword || '', // 关键字搜索
      param2: this.globalConds.plan_type || '0', // 计划类型
      param3: this.globalConds.project || '0', // 项目
      param4: this.globalConds.plan_level || '0', // 计划级别 
      param5: this.globalConds.plan_fx_level || '', // 风险等级
      param6: '未到期,超期未完', // 完成状态
      param7: this.globalConds.start, // 开始日期
      param8: this.globalConds.end, // 结束日期
      param9: this.globalConds.plan_data_type || '2', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1'
    }, '', false)
      .then(data => {
        this.tools.hideLoading();
        // console.log(data);
        if (data && data['data']) {
          this.plans = data['data'];
        } else {
          this.plans = [];
        }

        this.error = this.plans.length === 0 ? '没搜索到计划' : null;
      })
      .catch(error => {
        this.tools.hideLoading();
        // console.log(error);
        this.error = error.message || '服务器超时';
      });
  }

  error: any = null;

}
