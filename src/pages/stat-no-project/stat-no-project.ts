import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the StatNoProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-no-project',
  templateUrl: 'stat-no-project.html',
})
export class StatNoProjectPage {

  dataType: number = 0;
  dataTypes: any = [
    '我的计划统计',
    '部门计划统计'
  ];

  filterItems: any = [
    {
      name: '本月',
      closable: false
    },
    {
      name: '总裁交办',
      closable: true
    },
    {
      name: '枫丹西悦二期',
      closable: true
    },
    {
      name: '3级计划',
      closable: true
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatNoProjectPage');
  }

  openFilter() {

  }

  segmentChanged(ev) {

  }

  itemsChange() {
    console.log(this.filterItems);
  }

}
