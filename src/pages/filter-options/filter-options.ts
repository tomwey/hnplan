import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Utils } from '../../provider/Utils';
import { ApiService } from '../../provider/api-service';
import { Tools } from '../../provider/Tools';

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

  filterItems: any = [];
  currentProject: any = { value: '', name: '' };
  originProject: any = { value: '', name: '' };
  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private modalCtrl: ModalController,
    private api: ApiService,
    private tools: Tools,
    public navParams: NavParams) {
    // console.log(this.navParams.data);
    (this.navParams.data || []).forEach(item => {
      this.filterItems.push(item.name);
      if (item.type === 'project') {
        this.currentProject = Object.assign({}, item);
        this.originProject = Object.assign({}, item);
      }
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FilterOptionsPage');
    this.loadOptions();
  }

  prepareOptions() {
    this.options.forEach(opt => {
      for (let i = 0; i < opt.options.length; i++) {
        let item = opt.options[i];
        opt.selectOpt = null;
        if (this.filterItems.indexOf(item.name) !== -1) {
          opt.selected = item;
          break;
        }
      }
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  selectOpt(opt, item) {
    if (opt.selected) {
      if (opt.selected == item && opt.id !== 'date') {
        opt.selected = null;
      } else {
        opt.selected = item;
      }
    } else {
      opt.selected = item;
    }
  }

  loadOptions() {
    let promises: any = [];

    // 计划类型
    promises.push(this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取进度反馈记录查询条件APP',
      param1: '1',
      param2: Utils.getManID()
    }, '', false)
      .then(data => {
        // console.info('types:', data);
        let arr = data['data'];
        for (let i = 0; i < this.options.length; i++) {
          let opt = this.options[i];
          if (opt.id == 'plan_type') {
            let temp = [];
            arr.forEach(ele => {
              temp.push({ name: ele.bigtypename, value: ele.bigtypeid, type: 'plan_type' });
            })
            opt.options = temp;
            break;
          }
        }
      })
      .catch(error => {
        // console.info('types error:', error);
      }));

    // 计划级别
    promises.push(this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取进度反馈记录查询条件APP',
      param1: '2',
      param2: Utils.getManID()
    }, '', false)
      .then(data => {
        if (data && data['data']) {
          let arr = data['data'];
          for (let i = 0; i < this.options.length; i++) {
            let opt = this.options[i];
            if (opt.id == 'plan_level') {
              let temp = [];
              arr.forEach(ele => {
                temp.push({ name: ele.plangrade, value: ele.plangradeid, type: 'plan_level' });
              })
              opt.options = temp;
              break;
            }
          }

        }
      })
      .catch(error => {
      }));

    this.tools.showLoading('正在加载');
    Promise.all(promises).then(() => {
      this.tools.hideLoading();

      this.prepareOptions();
    })
      .catch(error => {
        this.tools.hideLoading();

        this.prepareOptions();
      });
  }

  selectProject() {
    let modal = this.modalCtrl.create('SelectProjectPage',
      { onlyShowL1Projects: false, currentProject: this.currentProject });
    modal.onDidDismiss((res) => {
      if (!res) return;

      this.currentProject.name = res.label;
      this.currentProject.value = res.value;
    });
    modal.present();
  }

  reset() {
    this.currentProject = Object.assign({}, this.originProject);
    this.prepareOptions();
  }

  confirm() {
    let temp = [];

    this.options.forEach(opt => {
      if (opt.selected) {
        let obj = Object.assign({}, opt.selected);
        obj.closable = true;
        if (obj.type == 'date') {
          obj.closable = false;
        }
        temp.push(obj);
      }
    });
    if (this.currentProject.name && this.currentProject.value) {
      temp.push({
        name: this.currentProject.name,
        value: this.currentProject.value,
        closable: true,
        type: 'project'
      });
    }
    this.viewCtrl.dismiss(temp);
  }

  options: any = [
    {
      id: 'date',
      name: '完成日期范围',
      options: [
        {
          name: '本月',
          value: 1,
          type: 'date'
        },
        {
          name: '本季',
          value: 2,
          type: 'date'
        },
        {
          name: '本年',
          value: 3,
          type: 'date'
        }
      ]
    },
    {
      id: 'plan_type',
      name: '计划类型',
      options: [
      ]
    },
    {
      id: 'plan_level',
      name: '计划级别',
      options: [
      ]
    }
  ];

}
