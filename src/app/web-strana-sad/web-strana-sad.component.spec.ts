import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebStranaSadComponent } from './web-strana-sad.component';

describe('WebStranaSadComponent', () => {
  let component: WebStranaSadComponent;
  let fixture: ComponentFixture<WebStranaSadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebStranaSadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebStranaSadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
