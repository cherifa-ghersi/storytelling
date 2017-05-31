import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarVertical2dComponent } from './bar-vertical-2d.component';

describe('BarVertical2dComponent', () => {
  let component: BarVertical2dComponent;
  let fixture: ComponentFixture<BarVertical2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarVertical2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarVertical2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
