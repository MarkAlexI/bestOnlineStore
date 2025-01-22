import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrdersComponent } from './cart-orders.component';

describe('CartOrdersComponent', () => {
  let component: CartOrdersComponent;
  let fixture: ComponentFixture<CartOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartOrdersComponent]
    });
    fixture = TestBed.createComponent(CartOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
