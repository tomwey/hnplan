import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { Utils } from '../../provider/Utils';

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

  menus: any = [];
  currentIndex: number = 0;
  planDataType: number = 0;

  item: any;
  title: any;
  conds: any;
  constructor(public navCtrl: NavController,
    private api: ApiService,
    public navParams: NavParams) {
    this.item = Object.assign({}, this.navParams.data.item);
    this.title = this.navParams.data.title;
    this.conds = this.navParams.data.conds || {};
  }

  ionViewDidLoad() {
    this.loadStageData();
  }

  loadBuildings() {
    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取项目楼栋及楼层APP',
      param1: this.conds.project || this.item.project_id || '0'
    })
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          this.buildings = data['data'];

          // building_batch_id: "1"
          // building_id: "3536"
          // building_name: "6#"
          // building_type_id: "10"
          // overground_layer: "31"
          // project_id: "1291509"
          // underground_layer: "2"
        }
        this.loadRoomPlanData();
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadRoomPlanData() {
    if (this.currBuildIndex >= this.buildings.length) {
      return;
    }

    if (this.currentIndex >= this.menus.length) {
      return;
    }
    let menu = this.menus[this.currentIndex];

    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取项目全景计划APP',
      param1: '2',
      param2: '',
      param3: '1040',
      param4: this.item.project_id,
      param5: this.conds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.conds.start || this.conds.begin_date || '',
      param9: this.conds.end || this.conds.end_date || '',
      param10: menu.stage_id || '0',
      param11: this.buildings[this.currBuildIndex].building_id || '0',
      param12: '2',
      param13: Utils.getManID(),
      param14: '0'
    })
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          let arr = data['data'];

          // building_id: "3536"
          // building_name: "6#"
          // enddate: "NULL"
          // ilevel: "22"
          // isover: false
          // iswarning: false
          // node_id: "1083"
          // node_name: "测试主体施工"
          // showroom: true
          // floors = [];
          // floorsData = {};
          // {
          //   '1': []
          // }
          let node_ids = [];
          let nodes = [{ id: 'floor', name: '楼层' }];
          let flData = {};
          let floors = [];
          arr.forEach(ele => {
            if (node_ids.indexOf(ele.node_id) === -1) {
              node_ids.push(ele.node_id);
              nodes.push({ name: ele.node_name, id: ele.node_id });
            }

            let floorData = flData[ele.node_id] || [];
            floorData.push(ele);
            flData[ele.node_id] = floorData;
            if (floors.indexOf(ele.ilevel) === -1) {
              floors.push(ele.ilevel);
            }
          });

          flData['floor'] = floors;

          this.barNodes = nodes;
          this.allFloorsData = flData;

          // console.log(nodes);
          // console.log(flData);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  loadPlansData() {
    if (this.currentIndex >= this.menus.length) {
      return;
    }
    let menu = this.menus[this.currentIndex];
    this.planDataType = menu.showroom ? 1 : 0;

    if (this.planDataType == 1) {
      this.loadBuildings();
      return;
    }

    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取项目全景计划APP',
      param1: '2',
      param2: '',
      param3: '1040',
      param4: this.item.project_id,
      param5: this.conds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.conds.start || this.conds.begin_date || '',
      param9: this.conds.end || this.conds.end_date || '',
      param10: menu.stage_id || '0',
      param11: '0',
      param12: this.navParams.data.data_type || '1',
      param13: Utils.getManID(),
      param14: '1'
    })
      .then(data => {
        console.log(data);
        if (data && data['data']) {
          if (this.planDataType === 0) {
            this.planList = data['data'];
          } else if (this.planDataType === 1) {
            let arr = data['data'];

          }
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  loadStageData() {
    // overnum: "0"
    // stage_id: "10"
    // stage_name: "展示区"
    // stage_order: "NULL"
    // totalnum: "3"
    // warningnum: "0"

    this.api.POST(null, {
      dotype: 'GetData',
      funname: '获取项目全景计划APP',
      param1: '1',
      param2: '',
      param3: '1040',
      param4: this.item.project_id,
      param5: this.conds.plan_level || '0',
      param6: '',
      param7: '',
      param8: this.conds.start || this.conds.begin_date || '',
      param9: this.conds.end || this.conds.end_date || '',
      param10: '0',
      param11: '0',
      param12: this.navParams.data.data_type || '1',
      param13: Utils.getManID(),
      param14: '1'
    })
      .then(data => {
        // console.log(data);
        if (data && data['data']) {
          this.menus = data['data'];
        }
        this.loadPlansData();
      })
      .catch(error => {
        console.log(error);
      });
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
    this.planDataType = this.menus[index].showroom ? 1 : 0;
    this.loadPlansData();
  }

  selectBuild(index) {
    this.currBuildIndex = index;
    this.loadRoomPlanData();
  }

  planList: any = [];

  currBuildIndex: number = 0;

  buildings: any = [];

  allFloorsData: any = {};

  barNodes: any = [];

}
