import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as shape from 'd3-shape';
import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import {Chart} from '../../chart.interface';

const defaultOptions = {
  view: [900, 600],
  colorScheme: colorSets.find(s => s.name === 'cool'),
  schemeType: 'ordinal',
  showLegend: true,
  legendTitle: 'Legend',
  gradient: false,
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

@Component({
  selector: 'app-ng-graph',
  templateUrl: './ng-graph.component.html',
  styleUrls: ['./ng-graph.component.scss']
})
export class NgGraphComponent implements OnInit, Chart {
  
  private chartOptions: any;
  private data: any[];
  private activated: boolean = true;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {...defaultOptions};
  }

  setData(graphData, graphConfig) {
    this.chartOptions = { ...this.chartOptions, ...graphConfig } ;
    this.data =  graphData;
  }

  init() {
    // this.width = 700;
    // this.height = 300;
    // this.view = [this.width, this.height];
  }

  load() {
    let tmpData= this.data;
    this.data = [];
    setInterval(()=> this.data = Object.assign(tmpData));
  }

  ease() {
  }

  select(data) {
    console.log('Item clicked', data);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

}
