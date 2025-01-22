import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SpinnerService } from '@shared/services/interaction/spinner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <ng-container *ngIf="spinner$ | async">
      <div class="disabled"><span class="loader"></span></div>
    </ng-container>
  `,
  styleUrls: ['./spinner.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf],
})
export class SpinnerComponent {
  private readonly spinnerService = inject(SpinnerService);
  public spinner$ = this.spinnerService.spinner$;
}
