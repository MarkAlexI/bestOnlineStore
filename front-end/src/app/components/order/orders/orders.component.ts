import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Orders } from '@interfaces/user.interface';
import { TransformPricePipe } from '@shared/pipes/transform-price.pipe';
import { Subscription } from 'rxjs';
import { IconComponent } from '@shared/components/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { DeliveryService } from '@shared/services/interaction/delivery.service';
import { OrdersCounterComponent } from '@shared/components/orders-counter/orders-counter.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TransformPricePipe,
    IconComponent,
    OrdersCounterComponent,
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  @Input() orders!: Orders[];
  @Output() total = new EventEmitter<number>();

  private readonly deliveryService = inject(DeliveryService);
  private readonly unSub = new Subscription();

  ngOnInit(): void {
    this.unSub.add(
      this.deliveryService.orderCounter$.subscribe((total) => {
        this.total.emit(total);
      })
    );
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
