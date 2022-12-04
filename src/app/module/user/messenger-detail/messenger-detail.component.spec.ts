import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerDetailComponent } from './messenger-detail.component';

describe('MessengerDetailComponent', () => {
  let component: MessengerDetailComponent;
  let fixture: ComponentFixture<MessengerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
