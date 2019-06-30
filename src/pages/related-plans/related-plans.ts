import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Tools } from '../../provider/Tools';

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
    private zone: NgZone,
    private tools: Tools,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad RelatedPlansPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    HNJSBridge.invoke('plan:getplans', null, (data) => {
      // alert(123);
      // alert(data);
      this.zone.run(() => {
        this.planSections = data || [];
      });

    });
  }

  add() {
    let IDs = [];
    let idValues = {};
    this.planSections.forEach(plan => {
      IDs.push(plan.id);
      idValues[plan.id] = plan.value;
    });
    this.navCtrl.push('SelectReleatedPlansPage', {
      planIDs: IDs,
      idVals: idValues,
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
    for (let i = 0; i < this.planSections.length; i++) {
      let val = this.planSections["value"] || "";
      if (!val) {
        this.tools.showToast('相关说明不能为空');
      }
      return;
    }
    HNJSBridge.invoke('plan:sendplans', this.planSections, (data) => { });
  }

}
