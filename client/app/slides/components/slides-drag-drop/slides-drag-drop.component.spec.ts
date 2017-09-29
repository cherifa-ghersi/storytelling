import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesDragDropComponent } from './slides-drag-drop.component';

describe('SlidesDragDropComponent', () => {
  let component: SlidesDragDropComponent;
  let fixture: ComponentFixture<SlidesDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidesDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
