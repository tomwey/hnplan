import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

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

  // canDoPlan: boolean = false;

  hasFlow: boolean = false;

  error: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    // private events: Events,
    private zone: NgZone,
    private iosFixed: iOSFixedScrollFreeze,
    private api: ApiService,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
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
        param2: Utils.getManID()
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
    // console.log(this.plan.icurdoflowid);
    let mid = parseInt((this.plan.icurdoflowid || '0').replace('NULL', '0').replace('无', '0'));
    this.canHandlePlan = this.plan.canhandleplan == '1' ? true : false;//!this.plan.isover && mid === 0;

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
      {
        label: '计划状态',
        value: this.plan.planhandlestate
      },
    ];

    // console.log(mid);

    // let val = this.plan.isover ? '已完成' : '未完成';
    // if (mid !== 0) {
    //   let prefix = '';
    //   if (this.plan.icurdotypeid == '2') {
    //     prefix = '调整';
    //   } else if (this.plan.icurdotypeid == '1') {
    //     prefix = "完成确认";
    //   }
    //   val = prefix + '审批中';
    // }

    // this.data.push({
    //   label: '计划状态',
    //   value: val
    // });

    // this.checkOperLoad();
  }

  gotoFeedbackList() {
    this.navCtrl.push('FeedbackListPage', this.plan);
  }

  doClick(type) {
    switch (type) {
      case 1:
        {
          // 变更
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
    // let mid = parseInt((this.plan.icurdoflowid || '0').replace('NULL', '0'));
    let mid = parseInt((this.plan.icurdoflowid || '0').replace('NULL', '0').replace('无', '0'));
    HNJSBridge.invoke('plan:openflow', { mid: mid }, (msg) => { });
  }

  data: any = [];

}
