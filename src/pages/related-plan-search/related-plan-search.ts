import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';
import { Utils } from '../../provider/Utils';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RelatedPlanSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-related-plan-search',
  templateUrl: 'related-plan-search.html',
})
export class RelatedPlanSearchPage {

  keyword: any = null;
  // currentProject: any = { id: '', name: '' };
  originKeyword: any = null;

  filterItems: any = [];
  currentProject: any = { value: '', name: '' };
  originProject: any = { value: '', name: '' };

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    private events: Events,
    private modalCtrl: ModalController,
    public navParams: NavParams) {

    (this.navParams.data || []).forEach(item => {
      this.filterItems.push(item.name);
      if (item.type === 'project') {
        this.currentProject = Object.assign({}, item);
        this.originProject = Object.assign({}, item);
      } else if (item.type === 'search') {
        this.keyword = item.value;
        this.originKeyword = item.value;
      }
    });

    let temp = [];
    temp.push({
      name: '当天',
      value: 1,
      type: 'date',
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
      type: 'date',
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
      type: 'date',
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
      type: 'date',
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
      type: 'date',
      start: start,
      end: end
    });
    this.options[0].options = temp;
    // console.log(this.options);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AdvancedSearchPage');
    this.iosFixed.fixedScrollFreeze(this.content)
    setTimeout(() => {
      this.loadOptions();
    }, 300);

  }

  selectProject() {
    let modal = this.modalCtrl.create('SelectProjectPage',
      { onlyShowL1Projects: false, currentProject: this.currentProject });
    modal.onDidDismiss((res) => {
      // console.log(res);
      if (!res) return;

      this.currentProject.name = res.label;
      this.currentProject.value = res.value;
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
              temp.push({ name: ele.bigtypename, value: ele.bigtypeid, type: 'plan_type' });
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
                temp.push({ name: ele.plangrade, value: ele.plangradeid, type: 'plan_level' });
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
      this.prepareOptions();
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
      if (opt.selected == item && opt.id !== 'date' && opt.id !== 'plan_scope') {
        opt.selected = null;
      } else {
        opt.selected = item;
      }
    } else {
      opt.selected = item;
    }
  }

  prepareOptions() {
    this.options.forEach(opt => {
      for (let i = 0; i < opt.options.length; i++) {
        let item = opt.options[i];
        opt.selected = null;
        if (this.filterItems.indexOf(item.name) !== -1) {
          opt.selected = item;
          break;
        }
      }
    });
  }

  reset() {
    this.keyword = this.originKeyword;
    this.currentProject = this.originProject;
    this.prepareOptions();
  }

  confirm() {
    let temp = [];

    this.options.forEach(opt => {
      if (opt.selected) {
        let obj = Object.assign({}, opt.selected);
        obj.closable = true;
        if (obj.type == 'date' || obj.type == 'plan_data_type') {
          obj.closable = false;
        }
        temp.push(obj);
      }
    });
    if (this.currentProject.name && this.currentProject.value) {
      temp.push({
        name: this.currentProject.name,
        value: this.currentProject.value,
        closable: true,
        type: 'project'
      });
    }

    if (this.keyword) {
      temp.push({
        name: `${this.keyword}`,
        value: this.keyword,
        closable: true,
        type: 'search'
      })
    }

    this.navCtrl.pop().then(() => {
      this.events.publish('select.filters', temp);
    });
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
          value: '高',
          type: 'plan_fx_level'
        },
        {
          name: '中风险',
          value: '中',
          type: 'plan_fx_level'
        },
        {
          name: '低风险',
          value: '低',
          type: 'plan_fx_level'
        },
        {
          name: '无风险',
          value: '无',
          type: 'plan_fx_level'
        }
      ]
    },
    {
      id: 'plan_scope',
      name: '计划范围',
      options: [
        {
          name: '我的计划',
          value: '1',
          type: 'plan_data_type'
        },
        {
          name: '部门计划',
          value: '2',
          type: 'plan_data_type'
        }
      ]
    }
  ];
}
