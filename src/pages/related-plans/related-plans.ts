import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RelatedPlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-related-plans',
  templateUrl: 'related-plans.html',
})
export class RelatedPlansPage {

  planSections: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RelatedPlansPage');
  }

  add() {
    // this.planSections.push({
    //   planid: '209302',
    //   planname: '测试计划一',
    //   plangrade: '一级',
    //   planbegindate: '2019-06-01',
    //   planoverdate: '2019-06-30'
    // })
    this.navCtrl.push('SelectReleatedPlansPage')
  }

  doDelete(sliding, sec) {
    sliding && sliding.close();
    let index = this.planSections.indexOf(sec);
    if (index !== -1) {
      this.planSections.splice(index, 1);
    }
  }

  back() {

  }

  confirm() {

  }

}
