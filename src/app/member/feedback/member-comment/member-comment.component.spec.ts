import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCommentComponent } from './member-comment.component';

describe('MemberCommentComponent', () => {
  let component: MemberCommentComponent;
  let fixture: ComponentFixture<MemberCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
