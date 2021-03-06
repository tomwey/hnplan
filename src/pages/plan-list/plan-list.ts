import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the PlanListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-list',
  templateUrl: 'plan-list.html',
})
export class PlanListPage {

  error: any = null;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PlanListPage');
    this.iosFixed.fixedScrollFreeze(this.content);
    setTimeout(() => {
      this.loadPlans();
    }, 350);

  }

  loadPlans() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划明细APP',
      param1: this.navParams.data.keyword || '', // 关键字搜索
      param2: this.navParams.data.plan_type || '0', // 计划类型
      param3: this.navParams.data.project || '0', // 项目
      param4: this.navParams.data.plan_level || '0', // 计划级别 
      param5: this.navParams.data.fx_level || '', // 风险等级
      param6: this.navParams.data.done_state || '', // 完成状态
      param7: this.navParams.data.begin_date || this.navParams.data.start || '', // 开始日期
      param8: this.navParams.data.end_date || this.navParams.data.end || '', // 结束日期
      param9: this.navParams.data.data_type || '1', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1',
      param12: this.navParams.data.source || "0", // 来源,
      param13: this.navParams.data.area || "0",  // 区域
      param14: this.navParams.data.major || "0",  // 区域
      param15: this.navParams.data.dept || "0",  // 区域
      param16: this.navParams.data.plan_flow || "0",  // 区域
    })
      .then(data => {
        // console.log(data);
        if (data['data']) {
          this.planList = data['data'];
        }

        this.error = this.planList.length === 0 ? '没有计划' : null;
      })
      .catch(error => {
        // console.log(error);
        this.error = error.message || '服务器超时';
      });
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  planList: any = [
    // {
    //   type: 1,
    //   typename: '职能计划',
    //   can_cb: true,
    //   level: '四级',
    //   name: '计划管理系统APP端功能规划初稿',
    //   source: '部门内部',
    //   projectname: '集团管理类'
    // },
    // {
    //   type: 2,
    //   typename: '项目计划',
    //   can_cb: true,
    //   name: '计划管理系统APP端功能规划初稿',
    //   level: '四级',
    //   source: '部门内部',
    //   projectname: '集团管理类'
    // },
    // {
    //   type: 3,
    //   typename: '专项计划',
    //   name: '计划管理系统APP端功能规划初稿',
    //   level: '四级',
    //   source: '部门内部',
    //   projectname: '集团管理类'
    // }
  ];

}
