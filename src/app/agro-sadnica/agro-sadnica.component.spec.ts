import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgroSadnicaComponent } from './agro-sadnica.component';

describe('AgroSadnicaComponent', () => {
  let component: AgroSadnicaComponent;
  let fixture: ComponentFixture<AgroSadnicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgroSadnicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgroSadnicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
