import { Component, Input } from "@angular/core";
import { Tools } from "../../provider/Tools";

/**
 * Generated class for the FilterBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "filter-bar",
  templateUrl: "filter-bar.html",
})
export class FilterBarComponent {
  filterConfigData: any = [];
  currentFilterData: any = {};
  dateObj = new Date();
  years = [];
  filterBaseData = {
    year: null,
    quarter: null,
    month: null,
  };
  monthList = [];
  hideMe = false;
  showFilterPanel = false;

  constructor(private tools: Tools) {
    this.initData();
  }

  initData() {
    this.initYears();

    this.filterBaseData = {
      year: this.years,
      quarter: [
        {
          name: "全部",
          value: "-1",
          field: "quarter",
        },
        {
          name: "1季度",
          value: "1",
          field: "quarter",
        },
        {
          name: "2季度",
          value: "2",
          field: "quarter",
        },
        {
          name: "3季度",
          value: "3",
          field: "quarter",
        },
        {
          name: "4季度",
          value: "4",
          field: "quarter",
        },
      ],
      month: "",
    };

    const month = this.dateObj.getMonth();

    if (month >= 0 && month <= 2) {
      this.currentFilterData["quarter"] = this.filterBaseData.quarter[1];
      this.filterBaseData.month = this.monthList[0];
    } else if (month >= 3 && month <= 5) {
      this.filterBaseData.month = this.monthList[1];
      this.currentFilterData["quarter"] = this.filterBaseData.quarter[2];
    } else if (month >= 6 && month <= 8) {
      this.filterBaseData.month = this.monthList[2];
      this.currentFilterData["quarter"] = this.filterBaseData.quarter[3];
    } else if (month >= 9 && month <= 11) {
      this.currentFilterData["quarter"] = this.filterBaseData.quarter[4];
      this.filterBaseData.month = this.monthList[3];
    }
    this.currentFilterData["year"] = this.filterBaseData.year[1];
    this.currentFilterData["month"] = {
      name: month + 1 + "月",
      value: month + 1 + "",
      field: "month",
    };
  }

  selectFilter(item) {
    const selectedObj = this.currentFilterData[item.field];
    if (
      selectedObj.field === "month" &&
      this.currentFilterData["quarter"].value === "-1"
    ) {
      this.tools.showToast("请先选择季度");
      return;
    }
    this.showFilterPanel = true;
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

  filterMenuName(item) {
    const obj = this.currentFilterData[item.field];
    if (!obj) {
      return item.name;
    }
    return obj.name;
  }

  filterItems: any[] = [
    {
      name: "年度",
      field: "year",
    },
    {
      name: "季度",
      field: "quarter",
    },
    {
      name: "月度",
      field: "month",
    },
  ];

  initYears() {
    this.years.push({
      name: "全部",
      value: "-1",
      field: "year",
    });

    for (let i = this.dateObj.getFullYear(); i >= 2014; i--) {
      this.years.push({
        name: i + "年",
        value: i,
        field: "year",
      });
    }

    this.monthList.push(
      [
        {
          name: "全部",
          value: "-1",
          field: "month",
        },
        {
          name: "1月",
          value: "1",
          field: "month",
        },
        {
          name: "2月",
          value: "2",
          field: "month",
        },
        {
          name: "3月",
          value: "3",
          field: "month",
        },
      ],
      [
        {
          name: "全部",
          value: "-1",
          field: "month",
        },
        {
          name: "4月",
          value: "4",
          field: "month",
        },
        {
          name: "5月",
          value: "5",
          field: "month",
        },
        {
          name: "6月",
          value: "6",
          field: "month",
        },
      ],
      [
        {
          name: "全部",
          value: "-1",
          field: "month",
        },
        {
          name: "7月",
          value: "7",
          field: "month",
        },
        {
          name: "8月",
          value: "8",
          field: "month",
        },
        {
          name: "9月",
          value: "9",
          field: "month",
        },
      ],
      [
        {
          name: "全部",
          value: "-1",
          field: "month",
        },
        {
          name: "10月",
          value: "10",
          field: "month",
        },
        {
          name: "11月",
          value: "11",
          field: "month",
        },
        {
          name: "12月",
          value: "12",
          field: "month",
        },
      ]
    );
  }
}
