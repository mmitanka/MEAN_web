import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroOnlineComponent } from './agro-online.component';

describe('AgroOnlineComponent', () => {
  let component: AgroOnlineComponent;
  let fixture: ComponentFixture<AgroOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
