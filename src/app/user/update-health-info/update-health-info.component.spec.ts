import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHealthInfoComponent } from './update-health-info.component';

describe('UpdateHealthInfoComponent', () => {
  let component: UpdateHealthInfoComponent;
  let fixture: ComponentFixture<UpdateHealthInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHealthInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHealthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
