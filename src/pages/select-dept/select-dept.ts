import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the SelectDeptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-dept',
  templateUrl: 'select-dept.html',
})
export class SelectDeptPage {

  pid: any;
  depts: any = [];
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    private api: ApiService,
    private tools: Tools,
    private viewCtrl: ViewController,
    private events: Events,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.pid = this.navParams.data.pid;
    if (this.pid == '0') {
      this.events.subscribe('select:dept', (data) => {
        this.viewCtrl.dismiss(data);
      });
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SelectDeptPage');
    this.iosFixed.fixedScrollFreeze(this.content);
    setTimeout(() => {
      this.loadData();
    }, 300);
  }

  loadData() {
    this.api.POST(null, {
      "dotype": "GetData",
      "funname": "获取计划区域或专业APP",
      "param1": '2'
    })
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          let arr = data['data'];
          // this.showSelectPage(arr, '选择所属部门', 2);
          this.prepareData(arr);
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器超时，请重试');
      });
  }

  prepareData(arr) {
    let temp = [];
    arr.forEach(element => {
      if (element.deptpid == this.pid) {
        temp.push(element);
      }
    });
    this.depts = temp;
  }

  close() {
    this.viewCtrl.dismiss();
  }

  selectItem(item, ev: Event) {
    ev.stopPropagation();
    if (this.pid == '0') {
      this.viewCtrl.dismiss({ name: item.deptname, id: item.deptid });
    } else {
      // console.log(item);
      this.navCtrl.popToRoot({ animate: false });
      this.events.publish('select:dept', { name: item.deptname, id: item.deptid });
    }
  }

  openNext(item, ev: Event) {
    ev.stopPropagation();
    this.navCtrl.push('SelectDeptPage', { pid: item.deptid });
  }

}
