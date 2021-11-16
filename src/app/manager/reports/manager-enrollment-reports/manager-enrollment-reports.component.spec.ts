import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEnrollmentReportsComponent } from './manager-enrollment-reports.component';

describe('ManagerEnrollmentReportsComponent', () => {
  let component: ManagerEnrollmentReportsComponent;
  let fixture: ComponentFixture<ManagerEnrollmentReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerEnrollmentReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEnrollmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
