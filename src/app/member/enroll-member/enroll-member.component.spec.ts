import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollMemberComponent } from './enroll-member.component';

describe('EnrollMemberComponent', () => {
  let component: EnrollMemberComponent;
  let fixture: ComponentFixture<EnrollMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
