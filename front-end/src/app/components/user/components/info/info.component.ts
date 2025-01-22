import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsComponent } from '@shared/components/icons/contact-us/contact-us.component';
import { InfoFormComponent } from '@shared/components/info-form/info-form.component';
import { CartService } from 'app/components/cart/services/cart.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [ContactUsComponent, InfoFormComponent],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  providers: [{ provide: CartService, useClass: CartService, multi: true }],
})
export class InfoComponent implements AfterViewChecked {
  @ViewChild(InfoFormComponent) infoFormComp!: InfoFormComponent;

  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  public infoForm = false;

  ngAfterViewChecked(): void {
    this.infoForm = this.infoFormComp.infoForm.valid;
    this.changeDetectorRef.detectChanges();
  }
  cancel() {
    this.infoFormComp.cancel();
  }

  redirectToContact() {
    this.router.navigate(['/about/contact']);
  }
}
