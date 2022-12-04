import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegisterSuccessComponent } from './dialog-register-success.component';

describe('DialogRegisterSuccessComponent', () => {
  let component: DialogRegisterSuccessComponent;
  let fixture: ComponentFixture<DialogRegisterSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegisterSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRegisterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
