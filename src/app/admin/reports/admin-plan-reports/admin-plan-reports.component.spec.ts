import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanReportsComponent } from './admin-plan-reports.component';

describe('AdminPlanReportsComponent', () => {
  let component: AdminPlanReportsComponent;
  let fixture: ComponentFixture<AdminPlanReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlanReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
