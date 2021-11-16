import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBatchReportsComponent } from './manager-batch-reports.component';

describe('ManagerBatchReportsComponent', () => {
  let component: ManagerBatchReportsComponent;
  let fixture: ComponentFixture<ManagerBatchReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerBatchReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerBatchReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
