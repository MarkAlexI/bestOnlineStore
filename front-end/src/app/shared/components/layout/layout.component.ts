import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { SpinnerComponent } from '../spinner/spinner.component';
import { SpinnerService } from '@shared/services/interaction/spinner.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgIf,
    AsyncPipe,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    SpinnerComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  private readonly spinnerService = inject(SpinnerService);
  public spinner$ = this.spinnerService.spinner$;
}
