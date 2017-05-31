import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import {Chart} from '../../chart.interface';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit, Chart {
  @Input() 
  private data: Array<any> = [];
  
  private activated: boolean = true;
  private width: number;
  private height: number;

  private chartOptions = {
    view: null,
    colorScheme: colorSets.find(s => s.name === 'cool'),
    schemeType: 'ordinal',
    showLegend: true,
    legendTitle: 'Legend',
    gradient: false,
    gaugeTextValue: '',
    gaugeMin: 0,
    gaugeMax: 100,
    gaugeUnits: 'alertes',
    gaugeAngleSpan: 240,
    gaugeStartAngle: -120,
    gaugeShowAxis: true,
    gaugeLargeSegments: 10,
    gaugeSmallSegments: 5,
    showXAxis: true,
    showYAxis: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    yAxisLabel: '',
    xAxisLabel: '',
    autoScale: true,
    showGridLines: true,
    rangeFillOpacity: 0.5,
    roundDomains: false,
    tooltipDisabled: false,
    showSeriesOnHover: true,
    curve: shape.curveLinear,
    curveClosed: shape.curveCardinalClosed
  };

  // margin
  margin: boolean = false;
  marginTop: number = 40;
  marginRight: number = 40;
  marginBottom: number = 40;
  marginLeft: number = 40;

  tooltipDisabled = false;

  constructor() { }

  ngOnInit() {
    this.chartOptions.colorScheme = {
      name: 'gauge',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
      ]
    }
  }

  setData(data) {
    this.chartOptions.gaugeUnits = data[0].unit;
    this.data =  data[0].results;
  }


  init() {
    // this.width = 700;
    // this.height = 300;
    // this.view = [this.width, this.height];
  }

  load() {
    let tmpData = this.data;
    this.data = [];
    setInterval(()=> this.data = Object.assign(tmpData));
  }


  ease() {
    // this.activated = false;
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

}
