import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedEnrollmentComponent } from './completed-enrollment.component';

describe('CompletedEnrollmentComponent', () => {
  let component: CompletedEnrollmentComponent;
  let fixture: ComponentFixture<CompletedEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
