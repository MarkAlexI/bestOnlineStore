import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { NovaPoshtaComponent } from './nova-poshta/nova-poshta.component';
import { UkrPoshtaComponent } from './ukr-poshta/ukr-poshta.component';
import { CourierComponent } from './courier/courier.component';
import { SelfPickupComponent } from './self-pickup/self-pickup.component';
import { DeliveryService } from '@shared/services/interaction/delivery.service';

@Directive({
  selector: '[appDepartment]',
  standalone: true,
})
export class DepartmentDirective {
  @Input('appDepartment') set useDep(department: string) {
    const comp = this.createComponent(department);
    this.viewContainerRef.clear();

    if (comp) {
      this.viewContainerRef.createComponent(comp);
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  private readonly deliveryService = inject(DeliveryService);

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly templateRef = inject(TemplateRef<any>);

  private createComponent(department: string) {
    switch (department) {
      case 'NovaPoshta':
        return NovaPoshtaComponent;
      // case 'UkrPoshta':
      //   return UkrPoshtaComponent;
      case 'Courier':
        return CourierComponent;
      case 'SelfPickUp':
        this.deliveryService.delivery({
          deliveryMethod: 'Самовивіз',
          isValid: true,
        });
        return SelfPickupComponent;
      default:
        return '';
    }
  }
}
