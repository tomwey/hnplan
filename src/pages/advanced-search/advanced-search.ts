import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the AdvancedSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advanced-search',
  templateUrl: 'advanced-search.html',
})
export class AdvancedSearchPage {

  title: any = '高级搜索';
  keyword: any = null;
  currentProject: any = { id: '', name: '' };
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    private modalCtrl: ModalController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.title = this.navParams.data.title;
    this.options[0].name = this.title == '计划搜索' ? '计划完成时间' : '反馈进度时间';
    // console.log(Utils.dateFormat(this.getMonday(new Date('2019-03-01'))));
    if (this.title != '计划搜索') {
      this.options.push(
        {
          id: 'cb_type',
          name: '反馈范围',
          options: [
            {
              name: '全部催办',
              value: '-1'
            },
            {
              name: '我的催办',
              value: Utils.getManID()
            }
          ]
        },
      );
    }

    let temp = [];
    temp.push({
      name: '当天',
      value: 1,
      start: Utils.dateFormat(new Date()),
      end: Utils.dateFormat(new Date())
    });

    // 本周
    let date = this.getMonday(new Date());
    let start = Utils.dateFormat(date);
    date.setDate(date.getDate() + 6);
    let end = Utils.dateFormat(date);

    temp.push({
      name: '本周',
      value: 2,
      start: start,
      end: end
    });

    // 本月
    date = new Date();
    date.setDate(1);
    start = Utils.dateFormat(date);
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    end = Utils.dateFormat(date);

    temp.push({
      name: '本月',
      value: 3,
      start: start,
      end: end
    });

    var now = new Date();
    var quarter = Math.floor((now.getMonth() / 3));
    var firstDate = new Date(now.getFullYear(), quarter * 3, 1);
    var endDate = new Date(firstDate.getFullYear(), firstDate.getMonth() + 3, 0);
    start = Utils.dateFormat(firstDate);
    end = Utils.dateFormat(endDate);
    // 本季
    temp.push({
      name: '本季',
      value: 4,
      start: start,
      end: end
    });

    var first = new Date(new Date().getFullYear(), 0, 1);
    var last = new Date(new Date().getFullYear(), 11, 31);
    start = Utils.dateFormat(first);
    end = Utils.dateFormat(last);

    // 本年
    temp.push({
      name: '本年',
      value: 5,
      start: start,
      end: end
    });
    this.options[0].options = temp;
    // console.log(this.options);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AdvancedSearchPage');
    this.iosFixed.fixedScrollFreeze(this.content);
    setTimeout(() => {
      this.loadOptions();
    }, 350);
  }

  selectProject() {
    let modal = this.modalCtrl.create('SelectProjectPage',
      { onlyShowL1Projects: false, currentProject: this.currentProject });
    modal.onDidDismiss((res) => {
      // console.log(res);
      if (!res) return;

      this.currentProject.name = res.label;
      this.currentProject.id = res.value;
      // this.currentProject.fromStore = false;
    });
    modal.present();
  }

  loadOptions() {
    let promises: any = [];

    // 计划类型
    promises.push(this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取进度反馈记录查询条件APP',
      param1: '1',
      param2: Utils.getManID()
    }, '', false)
      .then(data => {
        // console.info('types:', data);
        let arr = data['data'];
        for (let i = 0; i < this.options.length; i++) {
          let opt = this.options[i];
          if (opt.id == 'plan_type') {
            let temp = [];
            arr.forEach(ele => {
              temp.push({ name: ele.bigtypename, value: ele.bigtypeid });
            })
            opt.options = temp;
            break;
          }
        }
      })
      .catch(error => {
        // console.info('types error:', error);
      }));

    // 计划级别
    promises.push(this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取进度反馈记录查询条件APP',
      param1: '2',
      param2: Utils.getManID()
    }, '', false)
      .then(data => {
        // console.info('grades:', data);
        if (data && data['data']) {
          let arr = data['data'];
          for (let i = 0; i < this.options.length; i++) {
            let opt = this.options[i];
            if (opt.id == 'plan_level') {
              let temp = [];
              arr.forEach(ele => {
                temp.push({ name: ele.plangrade, value: ele.plangradeid });
              })
              opt.options = temp;
              break;
            }
          }

        }
      })
      .catch(error => {
        // console.info('grades error:', error);
      }));

    this.tools.showLoading('正在加载');
    Promise.all(promises).then(() => {
      this.tools.hideLoading();
    })
      .catch(error => {
        this.tools.hideLoading();
      });
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  selectOpt(opt, item) {
    if (opt.selected) {
      if (opt.selected == item) {
        opt.selected = null;
      } else {
        opt.selected = item;
      }
    } else {
      opt.selected = item;
    }
  }

  reset() {
    this.options.forEach(opt => {
      opt.selected = null;
      this.keyword = null;
      this.currentProject = { id: '', name: '' };
    });
  }

  confirm() {
    let conds = {};
    this.options.forEach(opt => {
      if (opt.selected) {
        if (opt.id == 'date') {
          conds['begin_date'] = opt.selected.start || '';
          conds['end_date'] = opt.selected.end || '';
        } else {
          conds[opt.id] = opt.selected.value;
        }
      }
    });
    if (this.keyword) {
      conds['keyword'] = this.keyword || '';
    }

    if (this.currentProject.id) {
      conds['project'] = this.currentProject.id || '0';
    }

    if (JSON.stringify(conds) === '{}') {
      this.tools.showToast('至少需要设置一个筛选条件');
      return;
    }

    // console.log(conds);
    let page = this.title === '计划搜索' ? 'PlanListPage' : 'FeedbackListPage';
    this.navCtrl.push(page, conds);
  }

  options: any = [
    {
      id: 'date',
      name: '计划完成时间',
      options: []
    },
    {
      id: 'plan_type',
      name: '计划类型',
      options: []
    },
    {
      id: 'plan_level',
      name: '计划级别',
      options: []
    },
    {
      id: 'fx_level',
      name: '风险等级',
      options: [
        {
          name: '高风险',
          value: '高'
        },
        {
          name: '中风险',
          value: '中'
        },
        {
          name: '低风险',
          value: '低'
        },
        {
          name: '无风险',
          value: '无'
        }
      ]
    }
  ];

}
