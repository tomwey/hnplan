import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the RelatedPlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var HNJSBridge;

@IonicPage()
@Component({
  selector: 'page-related-plans',
  templateUrl: 'related-plans.html',
})
export class RelatedPlansPage {

  planSections: any = [];
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RelatedPlansPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    HNJSBridge.invoke('plan:getplans', null, (data) => {
      this.planSections = data || [];
    });
  }

  add() {
    let IDs = [];
    this.planSections.forEach(plan => {
      IDs.push(plan.id);
    });
    this.navCtrl.push('SelectReleatedPlansPage', {
      planIDs: IDs,
      callback: (data) => {
        this.planSections = data;
        // console.log(data);
      }
    });
  }

  doDelete(sliding, sec) {
    sliding && sliding.close();
    let index = this.planSections.indexOf(sec);
    if (index !== -1) {
      this.planSections.splice(index, 1);
    }
  }

  back() {
    HNJSBridge.invoke('back', null, (data) => { });
  }

  confirm() {
    HNJSBridge.invoke('plan:sendplans', this.planSections, (data) => { });
  }

}
