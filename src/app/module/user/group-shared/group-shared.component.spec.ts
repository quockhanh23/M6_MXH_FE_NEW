import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSharedComponent } from './group-shared.component';

describe('GroupSharedComponent', () => {
  let component: GroupSharedComponent;
  let fixture: ComponentFixture<GroupSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
