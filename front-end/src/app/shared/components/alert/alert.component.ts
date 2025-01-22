import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { AlertService } from '@shared/services/interaction/alert.service';

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

  private timeout!: any;

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

      this.timeout = setTimeout(() => {
        clearTimeout(this.timeout);
        this.close();
      }, this.delay);
    });
  }

  close() {
    this.text = '';
    this.errorText = '';
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
    clearTimeout(this.timeout);
  }
}
