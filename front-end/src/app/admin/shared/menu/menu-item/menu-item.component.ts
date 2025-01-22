import {
  Component,
  HostListener,
  Input,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'app/components/catalog/menu/menu.component';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() public menuFor!: TemplateRef<MenuComponent>;

  @ViewChild('menuRef', { read: ViewContainerRef })
  public menuRef!: ViewContainerRef;

  @HostListener('mouseenter') onEnter() {
    this.addTemplate(this.menuFor);
  }

  @HostListener('mouseleave') onLeave() {
    this.menuRef.clear();
  }

  constructor(@Optional() private menuComponent: MenuComponent) {}

  private addTemplate(temp: TemplateRef<any>): void {
    if (temp) {
      this.menuRef.createEmbeddedView(temp);
    }
  }

  public containerClass(): string {
    return this.isRoot() ? 'menu__root' : 'menu__leave';
  }

  private isRoot(): boolean {
    return this.menuComponent ? true : false;
  }
}
