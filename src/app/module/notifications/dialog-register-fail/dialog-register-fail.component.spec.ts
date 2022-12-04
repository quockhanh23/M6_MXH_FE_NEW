import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterFailComponent } from './dialog-register-fail.component';

describe('DialogRegisterFailComponent', () => {
  let component: DialogRegisterFailComponent;
  let fixture: ComponentFixture<DialogRegisterFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegisterFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
