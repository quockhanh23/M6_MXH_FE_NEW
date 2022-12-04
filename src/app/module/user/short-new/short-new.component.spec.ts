import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortNewComponent } from './short-new.component';

describe('ShortNewComponent', () => {
  let component: ShortNewComponent;
  let fixture: ComponentFixture<ShortNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
