import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShortNewComponent } from './my-short-new.component';

describe('MyShortNewComponent', () => {
  let component: MyShortNewComponent;
  let fixture: ComponentFixture<MyShortNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyShortNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShortNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
