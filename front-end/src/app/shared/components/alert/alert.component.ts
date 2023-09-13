import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Type } from '@interfaces/message.interface';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  private unSub!: Subscription;
  private delay: number = 15000;
  public text!: string;
  public errorText!: string;
  public alertClass = {
    alert__success: false,
    alert__danger: false,
    alert__warning: false,
  };

  constructor(public alertService: AlertService) {}
  ngOnInit(): void {
    this.unSub = this.alertService.alert$.subscribe((alert) => {
      console.log(alert);
      this.text = alert.text;
      this.alertClass.alert__warning = alert.type === 'warning';
      this.alertClass.alert__danger = alert.type === 'danger';
      this.alertClass.alert__success = alert.type === 'success';
      if (alert.errorText) {
        this.errorText = alert.errorText;
      }

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
        this.errorText = '';
      }, this.delay);
    });
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
