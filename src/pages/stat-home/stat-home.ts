import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the StatHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stat-home',
  templateUrl: 'stat-home.html',
})
export class StatHomePage {

  dataType: number = 0;
  dataTypes: any = [
    '我的计划统计',
    '部门计划统计'
  ];
  dateTypes: any = ['本月', '本季', '本年'];
  currentType: number = 0;

  constructor(public navCtrl: NavController,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad StatHomePage');
  }

  segmentChanged(ev) {

  }

  selectDate(t) {
    this.currentType = t;
  }

  togglePlan() {
    this.app.getRootNavs()[0].setRoot(HomePage);
  }

}
