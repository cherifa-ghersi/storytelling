import {Component, ViewEncapsulation, ViewChildren, ElementRef, QueryList} from '@angular/core';
import {NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig, NgGridItemEvent} from 'angular2-grid';
import { Slide } from '../../models/slide';
import { MdDialog } from '@angular/material';
import {ChartBuilderComponent} from './charts-builder';
import {TextEditorComponent} from './text-editor/text-editor.component';
import {Chart} from '../../../charts';
interface Box {
  config: NgGridItemConfig,
  text: any;
  chart: any;
  width: number;
  height: number;
}

@Component({
  selector: 'app-slides-drag-drop',
  templateUrl: './slides-drag-drop.component.html',
  styleUrls: ['./slides-drag-drop.component.scss']
})
export class SlidesDragDropComponent {
  private slide: Array<Box> = [];
  private curNum;
  @ViewChildren('textContainer') textContainer: QueryList<ElementRef>;
  private gridConfig: NgGridConfig = <NgGridConfig>{
    'margins': [5],
    'draggable': true,
    'resizable': true,
    'max_cols': 0,
    'max_rows': 0,
    'visible_cols': 10,
    'visible_rows': 10,
    'min_cols': 1,
    'min_rows': 1,
    'col_width': 2,
    'row_height': 2,
    'cascade': 'off',
    'min_width': 20,
    'min_height': 20,
    'fix_to_grid': false,
    'auto_style': true,
    'auto_resize': false,
    'maintain_ratio': false,
    'prefer_new': false,
    'zoom_on_drag': false,
    'limit_to_screen': true,
  };
  private itemPositions: Array<any> = [];

  openChartBuilder() {
    const dialog = this.dialog.open(ChartBuilderComponent, {  height: '95%', width : '90%'});
    dialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed');
        this.addBox(result, 'chart');
      }
    });
  }

  constructor(private dialog: MdDialog) {
    // this.slide = [{
    //   chart: null,
    //   config: {
    //     borderSize:25,
    //     col: 1,
    //     row:1,
    //     sizex:32,
    //     sizey:22,
    //   },
    //   height : 258.90625,
    //   text:"<p><img src='data:image/png;base64,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…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' style='width: 300px;' class='fr-fic fr-dib'></p>",
    //   width: 369.90625
    // }, {
    //   chart:null,
    //   config :{
    //     borderSize
    //         :
    //         25,
    //     col
    //         :
    //         81,
    //     row
    //         :
    //         1,
    //     sizex
    //         :
    //         16,
    //     sizey
    //         :
    //         16,
    //   },
    //   height
    //       :
    //       180.90625,
    //   text
    //       :
    //       "<p><strong>dgsdgds</strong></p>",
    //   width
    //       :
    //       182.90625
    // }]
  }

  addBox(objectToAdd, type) {

    if(type === 'text'){
      const conf: NgGridItemConfig = this._generateDefaultItemConfig(50, 50);
      this.slide.push({ config : conf, text: objectToAdd, chart: null, height : 50, width : 50 });
    } else if (type ==='chart'){
      const conf: NgGridItemConfig = this._generateDefaultItemConfig(50, 50);
      this.slide.push({ config : conf, text: null, chart: objectToAdd, height : 50, width : 50});
    }
  }
  addText() {
    const dialog = this.dialog.open(TextEditorComponent, {  height: '60%', width : '90%' });
      dialog.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed');
          this.addBox(result, 'text');
        }
      });
  }
  removeBox(index: number) {
    if (this.slide[index]) {
      this.slide.splice(index, 1);
    }
  }
  editBox(index: number) {
    if (this.slide[index].text) {
      const dialog = this.dialog.open(TextEditorComponent, {  height: '60%', width : '90%'});
      dialog.componentInstance.text = this.slide[index].text;
      dialog.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed', result);
          this.slide[index].text = result;
        }
      });
    }
    if (this.slide[index].chart) {
      const dialog = this.dialog.open(ChartBuilderComponent, {  height: '95%', width : '90%' });
      dialog.componentInstance.chartType = this.slide[index].chart.chartType;
      dialog.componentInstance.chartOptions = this.slide[index].chart.chartOptions;
      dialog.componentInstance.data = this.slide[index].chart.data;
      dialog.afterClosed().subscribe(result => {
        if (result) {
          console.log('The dialog was closed', result);
          this.slide[index].chart = result;
        }
      });
    }
  }
  updateItem(index: number, event: NgGridItemEvent): void {
    // Do something here
  }

  onDrag(index: number, event: NgGridItemEvent): void {
    // Do something here
  }

  onResize(index: number, event: NgGridItemEvent): void {
    this.slide[index].width = event.width;
    this.slide[index].height = event.height;
    if(this.slide[index].text) {
      this.textContainer.map((e, i) => {
        if (i === index && e.nativeElement.children[0]) {
          e.nativeElement.children[0].firstChild.width = event.width;
          e.nativeElement.children[0].firstChild.height = event.height;
        }
      });
    }

  }
  getBoxes(boxes){
    console.log(boxes);
  }
  private _generateDefaultItemConfig(sizex, sizey): NgGridItemConfig {
    return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': sizex , 'sizey': sizey};
  }
}
