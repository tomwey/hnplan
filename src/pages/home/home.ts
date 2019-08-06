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
  weeks: any = [];

  planList: any = [];

  areas: any = [];
  areaProjects: any = {};

  feedbackDates: any = [];
  fbDatesList: any = {};

  @ViewChild('calendar') calendar: CalendarComponent;
  @ViewChild(Content) content: Content;

  currentDate: string = null;//Utils.dateFormat(new Date());

  currDate: any = new Date();

  dateOptions: CalendarComponentOptions = {
    monthFormat: 'YYYY 年 MM 月 ',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthPickerFormat: [
      '1月', '2月', '3月',
      '4月', '5月', '6月',
      '7月', '8月', '9月',
      '10月', '11月', '12月',
    ],
    weekStart: 0,
    from: new Date(2000, 0, 1),
  };

  error: any = null;

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
    this.currentDate = Utils.dateFormat(new Date());

    setTimeout(() => {
      this.loadPlans(this.currentDate, this.currentDate);

      let date = new Date(this.currentDate);
      date.setDate(1);
      let start = Utils.dateFormat(date);

      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      let end = Utils.dateFormat(date);

      this.loadCalendarData(start, end);
    }, 10);
  }

  loadPlans(bDate, eDate) {
    this.error = null;
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划明细APP',
      param1: '', // 关键字搜索
      param2: '0', // 计划类型
      param3: '0', // 项目
      param4: '0', // 计划级别 
      param5: '', // 风险等级
      param6: '', // 完成状态
      param7: bDate, // 开始日期
      param8: eDate, // 结束日期
      param9: '1', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1'
    })
      .then(data => {
        console.log(data);
        if (data['data']) {
          this.planList = data['data'];
        }

        this.error = this.planList.length === 0 ? '暂无计划事项' : null;
      })
      .catch(error => {
        // console.log(error);
        this.error = error.message || '服务器超时';
      });
  }

  loadCalendarData(bDate, eDate) {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取计划日历APP',
      param1: '', // 关键字搜索
      param2: '0', // 计划类型
      param3: '0', // 项目
      param4: '0', // 计划级别 
      param5: '', // 风险等级
      param6: '', // 完成状态
      param7: bDate, // 开始日期
      param8: eDate, // 结束日期
      param9: '1', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '1'
    }, '', false)
      .then(data => {
        // console.log(data);
        // let temp = [];
        let arr = data['data'];
        if (arr) {
          let _daysConfig: DayConfig[] = [];
          arr.forEach(ele => {
            let cssClass = '';
            if (ele.planstate == '1') {
              cssClass = 'success'
            } else if (ele.planstate == '2') {
              cssClass = 'pending'
            }
            if (Utils.dateFormat(new Date()) == ele.planenddate) {
              cssClass += ' today on-selected';
            }
            _daysConfig.push({
              date: new Date(ele.planenddate),
              subTitle: ' ', // ●
              cssClass: cssClass
            });
          });
          this.dateOptions.daysConfig = _daysConfig;
        } else {
          this.dateOptions.daysConfig = [];
        }
        this.calendar.options = this.dateOptions;
        // this.currentDate = Utils.dateFormat(new Date());//"2019-06-29";
      })
      .catch(error => {
        // console.log(error);
      });
  }

  changeDate(ev) {
    // console.log(ev);
    this.loadPlans(ev, ev);
  }

  changeMonth(ev) {
    let year = ev.newMonth.years;
    let month = ev.newMonth.months;
    // 获取当月最大日期；
    let date = new Date(year, month, 0);
    let end = Utils.dateFormat(date);
    date.setDate(1);
    let start = Utils.dateFormat(date);
    // console.log(start);
    this.loadCalendarData(start, end);
    // this.currentDate = start;
    let now = new Date();
    if (now.getFullYear() == year && (now.getMonth() + 1) == month) {
      this.currentDate = Utils.dateFormat(now);
    } else {
      this.currentDate = start;
    }

    this.loadPlans(this.currentDate, this.currentDate);
  }

  dateChanged(ev) {
    // console.log(ev);

    if (this.dataType == '2') {
      this.loadPlansByMonth();
    } else if (this.dataType == '1') {
      this.weeks = this.getWeeksInMonth(this.currDate.getFullYear(), this.currDate.getMonth());
      this.selectWeek(this.getWeekOfMonth());
    }
  }

  loadPlansByMonth() {

    let date = new Date();
    date.setFullYear(this.currDate.getFullYear());
    date.setMonth(this.currDate.getMonth());
    date.setDate(1);
    let start = Utils.dateFormat(date);
    date.setMonth(this.currDate.getMonth() + 1);
    date.setDate(0);
    let end = Utils.dateFormat(date);
    this.loadPlans(start, end);
  }

  search() {
    this.navCtrl.push('AdvancedSearchPage', {
      isfullplan: this.funcType == 1 ? '1' : '0',
      title: this.funcType !== 2 ? '计划搜索' : '反馈搜索', data_type: '1'
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

  doFullScape(ev) {
    this.navCtrl.push('ProjectDetailStatPage', { item: ev, title: `${ev.project_name || ev.projectname}全景计划` });
  }

  selectWeek(index) {
    this.weekIndex = index;

    if (index < this.weeks.length) {
      let w = this.weeks[index];
      let start = Utils.dateFormat(new Date(w.year, w.month, w.start));
      let end = Utils.dateFormat(new Date(w.year, w.month, w.end));
      this.loadPlans(start, end);
    }
    // this.loadPlans()
  }

  getWeekOfMonth() {
    // var d = new Date();
    let y = this.currDate.getFullYear();
    let m = this.currDate.getMonth();
    let now = new Date();
    if (y == now.getFullYear() && m == now.getMonth()) {
      // var date = this.currDate,
      //   w = date.getDay(),
      //   d = date.getDate();
      // return Math.ceil((d + 6 - w) / 7);
      var firstWeekday = new Date(this.currDate.getFullYear(), this.currDate.getMonth(), 1).getDay();
      var offsetDate = this.currDate.getDate() + firstWeekday - 1;
      return Math.floor(offsetDate / 7);
    }

    return 0;
  }

  getWeeksInMonth(year: number, month: number) {

    const weeks = [];
    const firstDay: Date = new Date(year, month, 1);
    const lastDay: Date = new Date(year, month + 1, 0);
    const daysInMonth: number = lastDay.getDate();
    let dayOfWeek: number = firstDay.getDay();
    let start: number;
    let end: number;
    for (let i = 1; i < daysInMonth + 1; i++) {
      dayOfWeek = new Date(year, month, i).getDay();
      if (dayOfWeek === 0 || i === 1) {
        start = i;
      }

      if (dayOfWeek === 6 || i === daysInMonth) {

        end = i;

        // if (start !== end) {

        weeks.push({
          start: start,
          end: end,
          year: year,
          month: month
        });
        // } else {
        // }
      }

      // dayOfWeek = new Date(year, month, i).getDay();
      // console.log(dayOfWeek);
    }

    return weeks;
  }

  segmentChanged(ev) {
    // console.log(this.dataType);
    if (this.dataType == '1') {
      // 按周
      // this.planList = [];
      this.weeks = this.getWeeksInMonth(this.currDate.getFullYear(), this.currDate.getMonth());
      this.selectWeek(this.getWeekOfMonth());

    } else if (this.dataType == '2') {
      // 按月
      // this.currDate.setDate(1);
      // this.dateChanged(null);
      this.loadPlansByMonth();
    } else if (this.dataType == '0') {
      // 按天
      this.loadPlans(this.currentDate, this.currentDate);

      let date = new Date(this.currentDate);
      date.setDate(1);
      let start = Utils.dateFormat(date);

      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      let end = Utils.dateFormat(date);

      this.loadCalendarData(start, end);
    }
  }

  segChanged(ev) {
    this.content.resize();
    this.error = null;
    // console.log(ev);
    if (this.funcType == 1) {
      // 全景计划
      this.loadProjectPlans();
    } else if (this.funcType == 2) {
      // 反馈记录
      this.loadFeedbackList();
    } else if (this.funcType == 0) {
      // 个人计划
    }

  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  loadFeedbackList() {
    let date = this.getMonday(new Date());
    let start = Utils.dateFormat(date);
    date.setDate(date.getDate() + 6);
    let end = Utils.dateFormat(date);

    this.error = null;
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '查询进度反馈记录APP',
      param1: Utils.getManID(),
      param2: '', // 关键字搜索
      param3: '-1', // 计划类型
      param4: '-1', // 计划级别 
      param5: '-1', // 项目
      param6: start, // 开始日期
      param7: end, // 结束日期
      param8: '', // 风险等级
      param9: '-1', // 催办范围,
      param10: '0'
    })
      .then(data => {
        // console.log(data);
        let temp = [];
        // let temp2 = [];
        let dateData = {};
        if (data && data['data']) {
          let arr = data['data'];
          arr.forEach(ele => {
            let date = ele.create_date || '';
            let a = date.split('T');
            // console.log(a);
            if (a.length > 0) {
              date = a[0];
            }
            // console.log(date);
            if (temp.indexOf(date) === -1) {
              temp.push(date);
            }

            let items = dateData[date] || [];
            let obj = Object.assign({}, ele);
            obj['create_date'] = obj.create_date.replace('NULL').replace('T', ' ').replace('+08:00', '');
            items.push(obj);
            dateData[date] = items;
          });
        }
        this.feedbackDates = temp;
        this.fbDatesList = dateData;
        if (JSON.stringify(this.fbDatesList) === '{}') {
          this.error = '暂无反馈记录';
        } else {
          this.error = null;
        }
      })
      .catch(error => {
        // console.log(error);
        this.error = error.message || "服务器出错了~";
      });
  }

  loadProjectPlans() {
    this.error = null;
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取项目全景计划汇总APP',
      param1: '', // 关键字搜索
      param2: '1040', // 计划类型
      param3: '0', // 项目
      param4: '0', // 计划级别 
      param5: '', // 风险等级
      param6: '', // 完成状态
      param7: '', // 开始日期
      param8: '', // 结束日期
      param9: '1', // 个人计划，组织计划
      param10: Utils.getManID(), // man id
      param11: '0'
    })
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          // area_id: "1679352"
          // area_name: "成都"
          // area_order: "2"
          // project_id: "1291509"
          // project_name: "珍宝锦城二期"
          // project_order: "4300"
          // projectovernum: "28"
          // projecttotalnum: "234"
          // projectwarningnum: "0"
          let arr = data['data'];
          let temp = [];
          let temp2 = [];
          let projectTemp = {};
          arr.forEach(ele => {
            if (temp.indexOf(ele.area_name) === -1) {
              temp.push(ele.area_name);
              temp2.push({
                id: ele.area_id,
                name: ele.area_name
              });
            }

            let items = projectTemp[ele.area_name] || [];
            items.push(ele);
            projectTemp[ele.area_name] = items;
          });
          this.areas = temp2;
          this.areaProjects = Object.assign({}, projectTemp);
          if (JSON.stringify(this.areaProjects) === '{}') {
            this.error = '暂无全景计划';
          } else {
            this.error = null;
          }
        }
      })
      .catch(error => {
        // console.log(error);
        this.error = error.message || "服务器出错了~";
      });
  }

  selectProject(proj) {
    this.navCtrl.push('ProjectDetailStatPage', { item: proj, title: `${proj.project_name}全景计划` });
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
