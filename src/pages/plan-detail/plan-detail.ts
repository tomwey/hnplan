import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the PlanDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var HNJSBridge;

@IonicPage()
@Component({
  selector: 'page-plan-detail',
  templateUrl: 'plan-detail.html',
})
export class PlanDetailPage {
  plan: any = {};

  canHandlePlan: boolean = false;
  hasFlow: boolean = false;

  error: any = null;

  constructor(public navCtrl: NavController,
    // private events: Events,
    private zone: NgZone,
    private api: ApiService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.loadPlan();
    }, 300);
  }

  loadPlan() {
    this.api.POST(null,
      {
        dotype: 'GetData',
        funname: '通过ID获取计划明细APP',
        param1: this.navParams.data.id || '0',
      })
      .then(data => {
        if (data && data['data']) {
          let arr = data['data'];
          if (arr.length > 0) {
            this.error = null;
            let object = arr[0];
            for (const key in object) {
              if (object.hasOwnProperty(key)) {
                let element = (object[key] || '').toString();
                element = element.replace('NULL', '无');
                let arr = element.split('T');
                if (arr.length > 0) {
                  element = arr[0];
                }
                this.plan[key] = element;
              }
            }
            this.prepareData();
          } else {
            this.error = '计划不存在';
          }
        } else {
          this.error = '未知错误';
        }
      })
      .catch(error => {
        this.error = error.message || '服务器出错了~';
      });
  }

  prepareData() {
    let mid = parseInt((this.plan.mid || '0').replace('NULL', '0'));
    this.canHandlePlan = !this.plan.isover && mid === 0;

    this.hasFlow = mid !== 0;

    this.data = [
      {
        label: '计划来源',
        value: this.plan.plansource
      },
      {
        label: '计划类型',
        value: this.plan.plantypename
      },
      {
        label: '项目名称',
        value: this.plan.projectname
      },
      {
        label: '计划名称',
        value: this.plan.itemname
      },
      {
        label: '计划层级',
        value: this.plan.plangrade
      },
      {
        label: '责任部门',
        value: this.plan.liabledeptname
      },
      {
        label: '第一责任人',
        value: this.plan.liablemanname
      },
      {
        label: '第二责任人',
        value: this.plan.otherliablemannamelist
      },
      {
        label: '经办人',
        value: this.plan.domanname
      },
      {
        label: '计划开始日期',
        value: this.plan.planbegindate
      },
      {
        label: '计划结束日期',
        value: this.plan.planoverdate
      },
      {
        label: '实际完成日期',
        value: this.plan.actualoverdate
      },
      // {
      //   label: '计划状态',
      //   value: '已完成'
      // },
    ];

    let val = this.plan.isover ? '已完成' : '未完成';
    if (mid !== 0) {
      let prefix = '';
      if (this.plan.icurdotypeid == '2') {
        prefix = '调整';
      } else if (this.plan.icurdotypeid == '1') {
        prefix = "完成确认";
      }
      val = prefix + '审批中';
    }

    this.data.push({
      label: '计划状态',
      value: val
    });

    this.checkOperLoad();
  }

  checkOperLoad() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '工作计划操作限制条件APP'
    }, '', false)
      .then(data => {
        let canDo = true;

        // 检查是否是经办人或第一责任人
        let manID = Utils.getManID();//[user[@"man_id"]description];
        let liableManIDs = this.plan.liablemannameid;
        canDo = canDo &&
          (manID == this.plan.domanid || liableManIDs.indexOf(manID) !== -1);

        let planMonth = this.plan.iplanmonth;
        // 检查是否是当月计划
        if (data && data['data']) {
          let arr = data['data'];
          if (arr.length > 0) {
            let item = arr[0];
            let month = parseInt(item.curmonth);
            let currTimeStr = item.curyear + month >= 10 ? '' : '0' + month;
            if (planMonth == currTimeStr) {
              canDo = canDo && true;
            } else {
              month = parseInt(item.premonth);
              currTimeStr = item.preyear + + month >= 10 ? '' : '0' + month;
              let curDay = parseInt(item.curday);
              let premonthcancommitdays = parseInt(item.premonthcancommitdays);
              if (item.bcancommitpremonth &&
                planMonth == currTimeStr &&
                curDay <= premonthcancommitdays
              ) {
                canDo = canDo && true;
              } else {
                canDo = false;
              }
            }
          }
        }

        this.canHandlePlan = this.canHandlePlan && canDo;
      })
      .catch(error => { });
  }

  gotoFeedbackList() {
    this.navCtrl.push('FeedbackListPage', this.plan);
  }

  doClick(type) {
    switch (type) {
      case 1:
        {
          // 变更
          let that = this;
          HNJSBridge.invoke('plan:change', this.plan, (data) => {
            // alert(msg);
            // this.zone.run(() => )
            this.loadPlan();
          });
        }
        break;
      case 2:
        {
          // 进度反馈
          HNJSBridge.invoke('plan:feedback', this.plan, (data) => {

          });
        }
        break;
      case 3:
        {
          // 完成确认
          HNJSBridge.invoke('plan:done', this.plan, (data) => {
            this.loadPlan();
          });
        }
        break;
      default:
        break;
    }
  }
  openFlow() {
    HNJSBridge.invoke('plan:openflow', { mid: this.plan.mid }, (msg) => { });
  }

  data: any = [];

}
