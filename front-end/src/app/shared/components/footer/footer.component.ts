import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { LogoComponent } from '../icons/logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
