import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';
import {ValidService} from '../../../../../services/valid.service';
import { environment } from '../../../../../../../environments/environment';
import * as slideOption from './slideOption';
import {MdDialogRef} from '@angular/material';

import { Slide } from '../../../../../models/slide';
@Component({
  selector: 'app-slide-editor',
  templateUrl: './slide-editor.component.html',
  styleUrls: ['./slide-editor.component.scss']
})
export class SlideEditorComponent implements OnInit, OnChanges {

  public slideIndex: number;  //slide index
  public slideSetting: Slide; //if it's not a new slide, the previous setting of the slide
  public slide: Slide; //slide setting
  form: FormGroup;//slide setting form
  private showForm: boolean; // indicator:showing slide form
  private dataBuilder: any; //data builder of graph
  pageLayoutOption: Array<any>; // page layout option of the slide
  titleAlignOption: Array<string>; //title align option of the slide
  private editorOptions: Object;//option of the text editor
  private isChartBuilderValid: boolean;//indicator for validation of chart builder


  constructor( public dialogRef: MdDialogRef<SlideEditorComponent>, private _fb: FormBuilder, private validService: ValidService) {
    this.slide = new Slide();
    this.form = this._buildForm();
    this.showForm = true;
    this.dataBuilder = {};

    this.titleAlignOption = slideOption.titleAlign;
    this.pageLayoutOption = slideOption.pageLayoutOption;

    this.isChartBuilderValid = true;
    // set server path
    let baseURL = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseURL += `:${environment.backend.port}`;
    };
    this.editorOptions = {
      heightMin: 200,
      heightMax: 400,
      charCounterMax: 3000,
      toolbarSticky: false,
      imageUploadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`,
      imageManagerLoadURL: `${baseURL}${environment.backend.endpoints.imagesServer}`
    };

  }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty("slideSetting")) {
      this.slide = this.slideSetting;
    }
  }

  private _buildForm() {
    return this._fb.group({
    });
  }

  /*validation for the childForm of slideForm*/
  validChildForm(isValid) {
    this.validService.changeSlideValid(isValid, this.slideIndex);
  }
  /*confirm the slide setting*/
  confirmSlide(isValid) {
    if (this.slideIndex) {
      this.slide.index = this.slideIndex;
    }
    this.validService.changeSlideValid(true, this.slideIndex);
    this.slide.isValid = true;
    this.dialogRef.close(this.slide);
  }
  /*confirm graph setting*/
  confirmeSlideGRaphConfig(data) {
    this.dataBuilder.data = data.data;
    this.dataBuilder.chartOptions = data.chartOptions;
  }
  /*change page layout*/
  pageLayoutChange(value) {
    console.log(value);
  }
  /*change bkg layout*/
  imgLayoutChange(value) {
  }
  /*change text vertical align*/
  textAlignChange(value) {
  }
  /* set image path*/
  setImageHtml(image) {
  }
}
