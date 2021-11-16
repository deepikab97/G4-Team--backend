import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHealthInfoComponent } from './add-health-info.component';

describe('AddHealthInfoComponent', () => {
  let component: AddHealthInfoComponent;
  let fixture: ComponentFixture<AddHealthInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHealthInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHealthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
