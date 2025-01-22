import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFormItemComponent } from './info-form-item.component';

describe('InfoFormItemComponent', () => {
  let component: InfoFormItemComponent;
  let fixture: ComponentFixture<InfoFormItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InfoFormItemComponent]
    });
    fixture = TestBed.createComponent(InfoFormItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
