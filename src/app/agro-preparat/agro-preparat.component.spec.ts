import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroPreparatComponent } from './agro-preparat.component';

describe('AgroPreparatComponent', () => {
  let component: AgroPreparatComponent;
  let fixture: ComponentFixture<AgroPreparatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroPreparatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroPreparatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
