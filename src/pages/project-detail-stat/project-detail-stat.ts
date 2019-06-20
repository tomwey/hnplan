import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectDetailStatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-detail-stat',
  templateUrl: 'project-detail-stat.html',
})
export class ProjectDetailStatPage {

  menus: any = [
    {
      name: '展示区',
      badge: 0,
      type: 0,
    },
    {
      name: '主体',
      badge: 6,
      type: 1,
    },
    {
      name: '砌体',
      badge: 0,
      type: 0,
    },
    {
      name: '外墙',
      badge: 0,
      type: 0,
    },
    {
      name: '抹灰',
      badge: 0,
      type: 0,
    },
    {
      name: '景观',
      badge: 0,
      type: 0,
    },
  ];
  currentIndex: number = 0;
  planDataType: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailStatPage');
  }

  selectMenu(index) {
    this.currentIndex = index;
    this.planDataType = this.menus[index].type;
  }

  planList: any = [
    {
      type: 1,
      typename: '职能计划',
      can_cb: true,
      level: '四级',
      name: '计划管理系统APP端功能规划初稿',
      source: '部门内部',
      projectname: '集团管理类',
      manname: '鲜代明'
    },
    {
      type: 2,
      typename: '项目计划',
      can_cb: true,
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类',
      manname: '鲜代明'
    },
    {
      type: 3,
      typename: '专项计划',
      name: '计划管理系统APP端功能规划初稿',
      level: '四级',
      source: '部门内部',
      projectname: '集团管理类',
      manname: '鲜代明'
    }
  ];

}
