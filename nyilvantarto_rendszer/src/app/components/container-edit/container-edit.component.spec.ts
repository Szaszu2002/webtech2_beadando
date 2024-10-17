import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEditComponent } from './container-edit.component';

describe('ContainerEditComponent', () => {
  let component: ContainerEditComponent;
  let fixture: ComponentFixture<ContainerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
