import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the FeedbackListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback-list',
  templateUrl: 'feedback-list.html',
})
export class FeedbackListPage {

  feedbackDates: any = [];
  fbDatesList: any = {};

  error: any = null;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FeedbackListPage');
    this.iosFixed.fixedScrollFreeze(this.content);
    setTimeout(() => {
      this.loadFeedbackList();
    }, 350);
  }

  loadFeedbackList() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '查询进度反馈记录APP',
      param1: Utils.getManID(),
      param2: this.navParams.data.keyword || '', // 关键字搜索
      param3: this.navParams.data.plan_type || '-1', // 计划类型
      param4: this.navParams.data.plan_level || '-1', // 计划级别 
      param5: this.navParams.data.project || '-1', // 项目
      param6: this.navParams.data.begin_date || '', // 开始日期
      param7: this.navParams.data.end_date || '', // 结束日期
      param8: this.navParams.data.fx_level || '', // 风险等级
      param9: this.navParams.data.cb_type || '-1', // 催办范围,
      param10: this.navParams.data.id || '0', // 计划ID,
      param11: this.navParams.data.area || "0",  // 区域
      param12: this.navParams.data.major || "0",  // 区域
      param13: this.navParams.data.dept || "0",  // 区域
      param14: this.navParams.data.plan_flow || "0",  // 区域
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
          this.error = '无反馈记录';
        } else {
          this.error = null;
        }
      })
      .catch(error => {
        // this.tools.showToast(error.message || '服务器出错了~');
        this.error = error.message || '服务器出错了~';
      });
  }

}
