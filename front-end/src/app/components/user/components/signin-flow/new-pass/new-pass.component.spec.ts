import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassComponent } from './new-pass.component';

describe('NewPassComponent', () => {
  let component: NewPassComponent;
  let fixture: ComponentFixture<NewPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NewPassComponent]
    });
    fixture = TestBed.createComponent(NewPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
