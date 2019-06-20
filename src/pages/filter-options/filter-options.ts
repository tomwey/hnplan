import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FilterOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter-options',
  templateUrl: 'filter-options.html',
})
export class FilterOptionsPage {

  selectedOpts: any = {
    date: null,
    plan_level: null,
    plan_type: null,
    project: null
  };
  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FilterOptionsPage');
  }

  close() {
    this.viewCtrl.dismiss();
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

  }

  confirm() {

  }

  options: any = [
    {
      id: 'date',
      name: '完成日期范围',
      options: [
        {
          name: '本月',
          value: 1
        },
        {
          name: '本季',
          value: 2
        },
        {
          name: '本年',
          value: 3
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
          name: '枫丹铂麓2期',
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
    }
  ];

}
