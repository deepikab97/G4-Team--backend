import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBatchReportsComponent } from './admin-batch-reports.component';

describe('AdminBatchReportsComponent', () => {
  let component: AdminBatchReportsComponent;
  let fixture: ComponentFixture<AdminBatchReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBatchReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBatchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
