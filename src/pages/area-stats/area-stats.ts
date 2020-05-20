import { Component, NgZone } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import ECharts from "echarts";

/**
 * Generated class for the AreaStatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-area-stats",
  templateUrl: "area-stats.html",
})
export class AreaStatsPage {
  pieChart;
  barChart;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private zone: NgZone
  ) {}

  ionViewDidLoad() {
    // console.log("ionViewDidLoad AreaStatsPage");
    setTimeout(() => {
      this.drawPieGraph();
      this.drawBarGraph();
    }, 300);
  }

  dateChanged2(ev) {
    console.log(ev);
  }

  drawBarGraph() {
    console.log(123);
    if (!this.barChart) {
      const pieDiv = document.getElementById("proj-graph") as HTMLDivElement;
      pieDiv.style.width = window.innerWidth - 30 + "px";
      pieDiv.style.height = 6 * 60 + "px";
      this.barChart = ECharts.init(pieDiv);
    }

    const options = {
      legend: {
        data: ["预警", "完成", "延期", "未完成"],
      },
      grid: {
        left: "3%",
        right: "5%",
        bottom: "3%",
        top: "10%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          data: [
            "枫丹铂麓1期",
            "枫丹铂麓2期",
            "枫丹铂麓3期",
            "枫丹西悦2期",
            "枫丹西悦3期",
            "铂悦府1期",
          ],
        },
      ],
      series: [
        {
          name: "预警",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [320, 302, 301, 334, 390, 330],
          barWidth: "20",
        },
        {
          name: "完成",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [120, 132, 101, 134, 90, 230],
          barWidth: "20",
        },
        {
          name: "延期",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [220, 182, 191, 234, 290, 330],
          barWidth: "20",
        },
        {
          name: "未完成",
          type: "bar",
          stack: "总量",
          label: {
            show: true,
            position: "insideRight",
          },
          data: [150, 212, 201, 154, 190, 330],
          barWidth: "20",
        },
      ],
      color: [
        "rgb(227,130,95)",
        "rgb(143,203,193)",
        "rgb(237,191,121)",
        "rgb(219,219,219)",
      ],
    };
    this.barChart.setOption(options);
  }

  drawPieGraph() {
    if (!this.pieChart) {
      const pieDiv = document.getElementById("total-graph2") as HTMLDivElement;
      pieDiv.style.width = window.innerWidth - 30 + "px";
      pieDiv.style.height = "300px";
      this.pieChart = ECharts.init(pieDiv);
    }
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: "",
      },
      legend: {
        orient: "horizontal",
        // right: 50,
        // top: 100,
        bottom: 20,
        // left: 50,
        // padding: [0, 0, 0, 0],
        data: ["预警", "延期", "完成", "未完成"],
      },
      graphic: {
        type: "text",
        top: "center",
        left: "center",
        style: {
          text: "89%\n达成率",
          fill: "#333",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
          textVertialAlign: "middle",
        },
      },
      series: [
        {
          name: "",
          type: "pie",
          center: ["50%", "50%"], // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
          radius: ["40%", "55%"],
          // radius: ["45%", "60%"],
          // silent: true,
          data: [
            { value: 98, name: "预警" },
            { value: 123, name: "延期" },
            { value: 980, name: "完成" },
            { value: 678, name: "未完成" },
          ],
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b}: {c}",
              },
              labelLine: {
                show: true,
              },
            },
          },
        },
      ],
      color: [
        "rgb(227,130,95)",
        "rgb(237,191,121)",
        "rgb(143,203,193)",
        "rgb(219,219,219)",
      ],
    };
    this.pieChart.setOption(option);
  }

  selectArea(area) {
    this.currArea = area.id;
  }

  selectNode(node) {
    this.currNodeID = node.id;
  }

  currNodeID = 1;

  nodes = [
    {
      id: 1,
      name: "一级节点",
    },
    {
      id: 2,
      name: "二级节点",
    },
    {
      id: 3,
      name: "三级节点",
    },
  ];

  areas = [
    {
      id: 1,
      name: "集团",
    },
    {
      id: 2,
      name: "成都",
    },
    {
      id: 3,
      name: "西安",
    },
    {
      id: 4,
      name: "郑州",
    },
    {
      id: 5,
      name: "长沙",
    },
    {
      id: 6,
      name: "重庆",
    },
    {
      id: 7,
      name: "宁波",
    },
  ];
  currArea = 1;
}
