import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorValidationComponent } from './error-validation.component';

describe('ErrorValidationComponent', () => {
  let component: ErrorValidationComponent;
  let fixture: ComponentFixture<ErrorValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ErrorValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
