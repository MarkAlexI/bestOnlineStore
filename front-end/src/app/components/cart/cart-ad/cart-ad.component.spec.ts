import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAdComponent } from './cart-ad.component';

describe('CartAdComponent', () => {
  let component: CartAdComponent;
  let fixture: ComponentFixture<CartAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartAdComponent]
    });
    fixture = TestBed.createComponent(CartAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
