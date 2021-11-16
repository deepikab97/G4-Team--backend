import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockRequestsComponent } from './unlock-requests.component';

describe('UnlockRequestsComponent', () => {
  let component: UnlockRequestsComponent;
  let fixture: ComponentFixture<UnlockRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
