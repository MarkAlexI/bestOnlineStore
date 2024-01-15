import {
  AfterViewChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, tap, map } from 'rxjs';

import { UserService } from 'app/components/user/services/user.service';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '@shared/utils/validators';
import { setupInitialValue } from '@shared/utils/initial-from-local';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';
import { InfoFormItemComponent } from './info-form-item/info-form-item.component';
import { AuthService } from 'app/components/user/services/signin-flow/auth.service';

@Component({
  selector: 'app-info-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorValidationComponent,
    InfoFormItemComponent,
  ],
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss'],
})
export class InfoFormComponent implements OnInit, OnDestroy, AfterViewChecked {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private unSub = new Subscription();
  private timeOutId!: any;

  @Input() isCart = false;

  public infoForm = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        nameValidator(),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        nameValidator(),
      ],
    ],
    email: ['', [Validators.required, Validators.email, emailValidator()]],

    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
        phoneValidator(),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        passwordValidator(),
      ],
    ],
  });

  ngOnInit() {
    this.getUserInfo();
  }

  ngAfterViewChecked(): void {
    if (this.infoForm.get('deliveryMethod')?.value === 'Нова пошта') {
      this.infoForm
        .get('novaPoshtaAddress')
        ?.addValidators(Validators.required);
      this.infoForm.get('novaPoshtaAddress')?.updateValueAndValidity();
    }

    if (this.infoForm.get('deliveryMethod')?.value !== 'Нова пошта') {
      this.infoForm
        .get('novaPoshtaAddress')
        ?.removeValidators(Validators.required);
      this.infoForm.get('novaPoshtaAddress')?.updateValueAndValidity();
    }
  }

  makeOrder() {
    if (this.infoForm.value) {
      console.log('make order');
      this.unSub.add(
        this.userService
          .updateUser(this.infoForm.value)
          .pipe(
            map((res) => {
              this.authService.nextUser(res);
              return res;
            }),
            tap(() => {
              this.router.navigate([{ outlets: { cart: null } }], {
                relativeTo: this.route.parent,
              });
            }),
            tap(() => {
              this.router.navigate(['/order']);
            })
          )
          .subscribe(() => {})
      );
    }
  }

  cancel() {
    this.infoForm.reset();
    this.getUserInfo();
  }

  private getUserInfo() {
    this.unSub.add(
      this.userService
        .getUserById(JSON.parse(localStorage.getItem('user')!)._id)
        .pipe(
          map((res: any) => {
            setupInitialValue(this.infoForm, res.user);
            return res;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }
  }
}
