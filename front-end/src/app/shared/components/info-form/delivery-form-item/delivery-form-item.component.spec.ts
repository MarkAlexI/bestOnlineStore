import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFormItemComponent } from './delivery-form-item.component';

describe('DeliveryFormItemComponent', () => {
  let component: DeliveryFormItemComponent;
  let fixture: ComponentFixture<DeliveryFormItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryFormItemComponent]
    });
    fixture = TestBed.createComponent(DeliveryFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
