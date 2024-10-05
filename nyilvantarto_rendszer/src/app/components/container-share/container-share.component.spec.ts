import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContainerShareComponent } from './container-share.component';

describe('ContainerShareComponent', () => {
  let component: ContainerShareComponent;
  let fixture: ComponentFixture<ContainerShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
