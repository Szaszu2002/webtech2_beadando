import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContainerCreateComponent } from './container-create.component';

describe('ContainerCreateComponent', () => {
  let component: ContainerCreateComponent;
  let fixture: ComponentFixture<ContainerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
