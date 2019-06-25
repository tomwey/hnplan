import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Events, Content, App } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { CalendarComponentOptions, DayConfig, CalendarComponent } from 'ion2-calendar';

declare var HNJSBridge;

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  loading: boolean = false;
  showLoading: boolean = true;
  isAndroid: boolean = false;

  funcType: number = 0;
  funcTypes: any = ['个人计划', '全景计划', '反馈记录'];

  dataType: any = '0';
  dataTypes: any = [
    {
      label: '按天',
      value: '0',
    },
    {
      label: '按周',
      value: '1',
    },
    {
      label: '按月',
      value: '2',
    }
  ];

  weekIndex: number = 0;
  weeks: any = [
    {
      name: '第1周',
      date: '01~07'
    },
    {
      name: '第2周',
      date: '08~15'
    },
    {
      name: '第3周',
      date: '16~21'
    },
    {
      name: '第4周',
      date: '22~28'
    },
    {
      name: '第5周',
      date: '29~30'
    },
  ]

  planList: any = [
    {
      type: 1,
      typename: '职能计划',
      can_cb: true,
      level: '四级',
      name: '计划管理系统APP端功能规划初稿',
      source: '部门内部',
      projectname: '集团管理类'
    },
    {
      type: 2,
      typename: '项目计划',
      can_cb: true,
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类'
    },
    {
      type: 3,
      typename: '专项计划',
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类'
    }
  ];

  plans: any = [{ type: 1, typename: '职能计划' }, { type: 2, typename: '项目计划' }, { type: 3, typename: '专项计划' }];
  projects: any = [{}, {}, {}, {}, {}, {}];

  feedbackList: any = [
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
  ];

  @ViewChild('calendar') calendar: CalendarComponent;
  @ViewChild(Content) content: Content;

  currentDate: string = Utils.dateFormat(new Date());

  currDate: any = new Date();

  dateOptions: CalendarComponentOptions = {
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    daysConfig: [
      {
        date: new Date('2019-06-02'),
        subTitle: '●',
        cssClass: 'pending'
      },
      {
        date: new Date('2019-06-03'),
        subTitle: '●',
        cssClass: 'pending'
      },
      {
        date: new Date('2019-06-04'),
        subTitle: '●',
        // cssClass: 'pending'
      },
      {
        date: new Date('2019-06-12'),
        subTitle: '●',
        cssClass: 'success'
      },
      {
        date: new Date('2019-06-13'),
        subTitle: '●',
        cssClass: 'success'
      },
      {
        date: new Date('2019-06-14'),
        subTitle: '●'
      },
      {
        date: new Date('2019-06-15'),
        subTitle: '●',
        // cssClass: 'success'
      },
    ],
    monthPickerFormat: [
      '1月', '2月', '3月',
      '4月', '5月', '6月',
      '7月', '8月', '9月',
      '10月', '11月', '12月',
    ],
    weekStart: 0,
    from: new Date(2000, 0, 1),
  };

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    private events: Events,
    private app: App,
    public navParams: NavParams) {
    this.isAndroid = this.checkIsAndroid();
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  changeDate(ev) {

  }

  dateChanged(ev) {
    console.log(ev);
  }

  prev() {

  }

  next() {

  }

  search() {
    this.navCtrl.push('AdvancedSearchPage', { title: this.funcType === 0 ? '计划搜索' : '反馈搜索' });
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  doFullScape(ev) {
    this.navCtrl.push('ProjectDetailStatPage');
  }

  selectWeek(index) {
    this.weekIndex = index;
  }

  segmentChanged(ev) {

  }

  segChanged(ev) {
    this.content.resize();
  }

  changeMonth(ev) {

  }

  selectProject(proj) {
    this.navCtrl.push('ProjectDetailStatPage');
  }

  checkIsAndroid() {
    let ua = window.navigator.userAgent.toLowerCase();
    // let results: RegExpMatchArray = ua.match(/android/i);
    // console.log(results);
    // if (results && results.toString() == 'android') {
    //   return true;
    // } else {
    //   return false;
    // }
    return ua.indexOf('android') !== -1;
  }

  ionViewWillEnter() {
    this.showLoading = true;
  }

  ionViewWillLeave() {
    this.showLoading = false;
  }

  changeStats() {
    this.app.getRootNavs()[0].setRoot('StatHomePage');
  }

  back() {
    // window.location.href = 'plan://back';
    HNJSBridge.invoke('back', null, null);
  }

}
