import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPlanReportsComponent } from './manager-plan-reports.component';

describe('ManagerPlanReportsComponent', () => {
  let component: ManagerPlanReportsComponent;
  let fixture: ComponentFixture<ManagerPlanReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerPlanReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerPlanReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
