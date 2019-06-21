import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.data.title;
    this.options[0].name = this.title == '计划搜索' ? '计划完成时间' : '反馈进度时间';
    if (this.title != '计划搜索') {
      this.options.push(
        {
          id: 'cb_type',
          name: '反馈范围',
          options: [
            {
              name: '全部催办',
              value: 2039283
            },
            {
              name: '我的催办',
              value: 1837362
            }
          ]
        },
      );
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad AdvancedSearchPage');
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
    // this.prepareOptions();
  }

  confirm() {
    let temp = [];
    this.options.forEach(opt => {
      // console.log(opt.selected);
      if (opt.selected) {
        let obj = Object.assign({}, opt.selected);
        obj.closable = true;
        if (obj.name == '本月' || obj.name == '本季' || obj.name == '本年') {
          obj.closable = false;
        }
        temp.push(obj);
      }
    });
    // this.viewCtrl.dismiss(temp);
    let page = this.title === '计划搜索' ? 'PlanListPage' : 'FeedbackListPage';
    this.navCtrl.push(page, temp);
  }

  options: any = [
    {
      id: 'date',
      name: '计划完成时间',
      options: [
        {
          name: '当天',
          value: 1
        },
        {
          name: '本周',
          value: 2
        },
        {
          name: '本月',
          value: 3
        },
        {
          name: '本季',
          value: 4
        },
        {
          name: '本年',
          value: 5
        }
      ]
    },
    {
      id: 'plan_type',
      name: '计划类型',
      options: [
        {
          name: '总裁交办',
          value: 0
        },
        {
          name: '职能计划',
          value: 1
        },
        {
          name: '项目计划',
          value: 2
        },
        {
          name: '专项计划',
          value: 3
        }
      ]
    },
    {
      id: 'project',
      name: '所属项目',
      options: [
        {
          name: '枫丹西悦二期',
          value: 2039283
        },
        {
          name: '枫丹铂麓一期',
          value: 1837362
        },
        {
          name: '枫丹唐悦二期',
          value: 1928383
        }
      ]
    },
    {
      id: 'plan_level',
      name: '计划级别',
      options: [
        {
          name: '一级',
          value: 1
        },
        {
          name: '二级',
          value: 2
        },
        {
          name: '三级',
          value: 3
        },
        {
          name: '四级',
          value: 4
        },
        {
          name: '里程碑',
          value: 5
        }
      ]
    },
    {
      id: 'fx_level',
      name: '风险等级',
      options: [
        {
          name: '高风险',
          value: 1
        },
        {
          name: '中风险',
          value: 2
        },
        {
          name: '低风险',
          value: 3
        },
        {
          name: '无风险',
          value: 4
        }
      ]
    }
  ];

}
