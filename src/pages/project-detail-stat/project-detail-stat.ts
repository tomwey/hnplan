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
    // console.log('ionViewDidLoad ProjectDetailStatPage');
  }

  selectPlan(ev) {
    // console.log(ev);
    this.navCtrl.push('PlanDetailPage', ev);
  }

  doUrge(ev) {
    // console.log(ev);
    // console.log(124);
  }

  selectMenu(index) {
    this.currentIndex = index;
    this.planDataType = this.menus[index].type;
  }

  selectBuild(index) {
    this.currBuildIndex = index;
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

  currBuildIndex: number = 0;

  buildings: any = [
    {
      name: '#1楼'
    },
    {
      name: '#2楼'
    },
    {
      name: '#3楼'
    },
    {
      name: '#5楼'
    },
    {
      name: '#6楼'
    },
    {
      name: '#7楼'
    },
    {
      name: '#8楼'
    },
    {
      name: '#9楼'
    },
  ];

  floorsData: any = [
    {
      floor: 20,
      name: '20',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 0
    },
    {
      floor: 19,
      name: '19',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 0
    },
    {
      floor: 18,
      name: '18',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 0
    },
    {
      floor: 17,
      name: '17',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 2,
      l5: 0
    },
    {
      floor: 16,
      name: '16',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 2,
      l5: 0
    },
    {
      floor: 15,
      name: '15',
      l1: 2,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 0
    },
    {
      floor: 14,
      name: '14',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
      l5: 2
    },
    {
      floor: 13,
      name: '13',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 1,
      l5: 1
    },
    {
      floor: 12,
      name: '12',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 1,
      l5: 1
    },
    {
      floor: 11,
      name: '11',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 1,
      l5: 1
    },
    {
      floor: 10,
      name: '10',
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 1,
      l5: 1
    },
    {
      floor: 9,
      name: '9',
      l1: 1,
      l2: 0,
      l3: 2,
      l4: 1,
      l5: 1
    },
    {
      floor: 8,
      name: '8',
      l1: 1,
      l2: 0,
      l3: 2,
      l4: 1,
      l5: 1
    },
    {
      floor: 7,
      name: '7',
      l1: 1,
      l2: 0,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 6,
      name: '6',
      l1: 1,
      l2: 0,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 5,
      name: '5',
      l1: 1,
      l2: 0,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 4,
      name: '4',
      l1: 1,
      l2: 0,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 3,
      name: '3',
      l1: 1,
      l2: 1,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 2,
      name: '2',
      l1: 1,
      l2: 1,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: 1,
      name: '1',
      l1: 1,
      l2: 1,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: -1,
      name: '-1',
      l1: 1,
      l2: 1,
      l3: 1,
      l4: 1,
      l5: 1
    },
    {
      floor: -2,
      name: '-2',
      l1: 1,
      l2: 1,
      l3: 1,
      l4: 1,
      l5: 1
    },
  ]

  names: any = ['楼层', '主体', '砌体', '内抹', '外抹', '地坪'];

}
