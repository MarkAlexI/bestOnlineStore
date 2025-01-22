import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LogoComponent } from '../icons/logo/logo.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LogoComponent,
    SearchComponent,
    RouterLink,
    RouterLinkActive,
    IconComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {}
