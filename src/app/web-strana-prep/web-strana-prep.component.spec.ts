import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebStranaPrepComponent } from './web-strana-prep.component';

describe('WebStranaPrepComponent', () => {
  let component: WebStranaPrepComponent;
  let fixture: ComponentFixture<WebStranaPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebStranaPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebStranaPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
