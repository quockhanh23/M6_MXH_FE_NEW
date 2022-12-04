import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortNewsAllComponent } from './short-news-all.component';

describe('ShortNewsAllComponent', () => {
  let component: ShortNewsAllComponent;
  let fixture: ComponentFixture<ShortNewsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortNewsAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortNewsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
