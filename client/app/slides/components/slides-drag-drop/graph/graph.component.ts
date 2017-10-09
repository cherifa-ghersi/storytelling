import { Component, OnInit, AfterContentInit, OnChanges, DoCheck , ElementRef, Input, ViewChild, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';
import { Chart } from '../../../../charts/chart.class';
import { ChartsService } from '../../../services';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterContentInit, OnChanges {
  @Input() chart: any;
  @Input() width: number;
  @Input() height: number;


  @ViewChild('parent', { read: ViewContainerRef }) parent: ViewContainerRef;
  componentRef: ComponentRef<any>;
  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private chartsService: ChartsService) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.resolveCmp();
  }
  ngOnChanges() {
    this.resolveCmp();

  }
  private resolveCmp() {
    let cmpName: string;
    console.log(this.chart.chartType);
    if (this.chart.chartType
        && this.chart.chartType.cmpName != null) {
      cmpName = this.chart.chartType.cmpName;
    }
    let cmpType: string = cmpName.charAt(0).toUpperCase() + cmpName.slice(1) + 'Component';
    console.log(cmpType);
    this.setChart(cmpType);
  }

  private setChart(chartType: string) {
    if (this.parent)
      this.parent.clear();
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    if (this.chartsService.getChartType(chartType) === undefined) return;
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.chartsService.getChartType(chartType));
    this.componentRef = this.parent.createComponent(componentFactory);
    console.log(this.chart.data);
    this.componentRef.instance.dataInput = this.chart.data; // set the input inputData of the abstract class Chart
  }

}
