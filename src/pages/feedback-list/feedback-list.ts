import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  feedbackList: any = [
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
    { list: [{}, {}, {}] },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FeedbackListPage');
  }

}
