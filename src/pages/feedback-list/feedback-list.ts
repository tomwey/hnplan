import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';
import { Tools } from '../../provider/Tools';

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

  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FeedbackListPage');
    this.loadFeedbackList();
  }

  loadFeedbackList() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '查询进度反馈记录APP',
      param1: Utils.getManID(),
      param2: this.navParams.data.itemname || '', // 关键字搜索
      param3: '-1', // 计划类型
      param4: '-1', // 计划级别 
      param5: '-1', // 项目
      param6: '', // 开始日期
      param7: '', // 结束日期
      param8: '', // 风险等级
      param9: '-1', // 催办范围
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
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
        // console.log(error);
        // this.error = error.message || "服务器出错了~";
      });
  }

}
