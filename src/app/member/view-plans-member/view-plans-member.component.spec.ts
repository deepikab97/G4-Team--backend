import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlansMemberComponent } from './view-plans-member.component';

describe('ViewPlansMemberComponent', () => {
  let component: ViewPlansMemberComponent;
  let fixture: ComponentFixture<ViewPlansMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlansMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlansMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
