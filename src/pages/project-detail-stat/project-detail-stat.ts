import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the ProjectDetailStatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-project-detail-stat",
  templateUrl: "project-detail-stat.html",
})
export class ProjectDetailStatPage {
  plans = [
    {
      id: 1,
      itemname: "售楼部建筑设计单位定标",
      level: 3,
      levelname: "三级",
      plandate: "2019-12-01",
      state: "1",
    },
    {
      id: 2,
      itemname: "展示区选址、定位及策划建议",
      level: 2,
      levelname: "二级",
      plandate: "2019-12-30",
      state: "1",
      year: "2019年",
    },
    {
      id: 3,
      itemname: "主体结构封顶完成",
      level: 2,
      levelname: "二级",
      plandate: "2019-03-01",
      state: "2",
    },
    {
      id: 4,
      itemname: "售楼部建筑方案设计并通过内部评审",
      level: 2,
      levelname: "二级",
      plandate: "2019-03-01",
      state: "1",
    },
    {
      id: 5,
      itemname: "售楼部建筑设计单位定标",
      level: 3,
      levelname: "三级",
      plandate: "2019-04-01",
      state: "1",
    },
    {
      id: 6,
      itemname: "售楼部建筑方案设计并通过内部评审",
      level: 3,
      levelname: "三级",
      state: "1",
    },
    {
      id: 7,
      itemname: "经营性现金流回正",
      level: 1,
      levelname: "一级",
      plandate: "2019-04-21",
    },
    {
      id: 115,
      itemname: "售楼部建筑方案设计并通过内部评审",
      level: 3,
      levelname: "三级",
      plandate: "2019-04-21",
    },
    {
      id: 123,
      itemname: "景观石材防护处理",
      level: 2,
      levelname: "三级",
      plandate: "2019-04-21",
      state: "1",
    },
    {
      id: 1113,
      itemname: "售楼部建筑方案设计并通过内部评审",
      level: 3,
      levelname: "三级",
      plandate: "2019-04-21",
      state: "2",
    },
    {
      id: 113,
      itemname: "户内房间、厨房烟道渗水部分整改完成",
      level: 3,
      levelname: "三级",
      plandate: "2019-04-21",
    },
    {
      id: 112,
      itemname: "景观石材防护处理",
      level: 3,
      levelname: "三级",
      plandate: "2019-04-21",
    },
    {
      id: 111,
      itemname: "形象进度达预售条件",
      level: 1,
      levelname: "一级",
      plandate: "2019-04-21",
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ProjectDetailStatPage");
  }

  changeStats() {}

  selectPlan(plan) {}

  selectFilter(item) {
    this.showFilterPanel = true;

    const selectedObj = this.currentFilterData[item.field];

    const data = this.filterBaseData[item.field];
    data.forEach((config) => {
      config.selected = false;
      if (
        selectedObj &&
        selectedObj.value === config.value &&
        selectedObj.name === config.name
      ) {
        config.selected = true;
      }
    });
    this.filterConfigData = data;
  }

  selectFilterItem(item) {
    // if (item.field === "year" && item.value === "-1") {
    //   return;
    // }

    this.showFilterPanel = false;

    // if (!(item.field === "quater" && item.value === "-1")) {
    //   if (item.selected) {
    //     return;
    //   }
    // }
    this.currentFilterData[item.field] = item;
    console.log(this.currentFilterData);
    // this.loadData();
  }
  filterMenuName(item) {
    const obj = this.currentFilterData[item.field];
    if (!obj) {
      return item.name;
    }
    return obj.name;
  }

  closeFilter() {
    this.showFilterPanel = false;
  }

  nodes = [
    {
      name: "土地摘牌",
      state: 1,
    },
    {
      name: "用地证",
      state: 1,
    },
    {
      name: "国土证",
      state: 1,
    },
    {
      name: "产品定位",
      state: 1,
    },
    {
      name: "方案正式",
      state: 1,
    },
    {
      name: "文本规正",
      state: 1,
    },
    {
      name: "清水施工",
      state: 1,
    },
    {
      name: "预售条件",
      state: 2,
    },
    {
      name: "预售证",
      state: 0,
    },
    {
      name: "主体封顶",
      state: 0,
    },
  ];

  filterItems: any[] = [
    {
      name: "计划层级",
      field: "grade",
    },
    {
      name: "专业线",
      field: "special",
    },
    {
      name: "完成状态",
      field: "state",
    },
  ];
  filterConfigData: any = [];
  currentFilterData: any = {};
  filterBaseData: any = {
    grade: [
      {
        name: "全部",
        value: "-1",
        field: "grade",
      },
      {
        name: "一级",
        value: "1",
        field: "grade",
      },
      {
        name: "二级",
        value: "2",
        field: "grade",
      },
      {
        name: "三级",
        value: "3",
        field: "grade",
      },
    ],
    special: [
      {
        name: "全部",
        value: "-1",
        field: "special",
      },
    ],
    state: [
      {
        name: "全部",
        value: "-1",
        field: "state",
      },
      {
        name: "已完成",
        value: "1",
        field: "state",
      },
      {
        name: "延期",
        value: "2",
        field: "state",
      },
      {
        name: "预警",
        value: "4",
        field: "state",
      },
    ],
  };
  hideMe = false;
  showFilterPanel = false;
}
