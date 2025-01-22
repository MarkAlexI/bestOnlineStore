import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { VisibilityIconComponent } from '@shared/components/icons/visibility-icon/visibility-icon.component';
import { AuthService } from '../../../services/signin-flow/auth.service';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import {
  confirmValidator,
  emailValidator,
  nameValidator,
  passwordValidator,
} from '@shared/utils/validators';
import { ErrorValidationComponent } from '@shared/components/error-validation/error-validation.component';
import { isValid } from '@shared/utils/is-valid';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    VisibilityIconComponent,
    ReactiveFormsModule,
    GoogleLoginComponent,
    ErrorValidationComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private unSub = new Subscription();
  public readonly isValid = isValid;

  public signupForm: FormGroup = this.fb.group({
    name: [
      null,
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        nameValidator(),
      ],
    ],
    email: [null, [Validators.required, Validators.email, emailValidator()]],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        passwordValidator(),
        confirmValidator(),
      ],
    ],
    confirmPassword: [
      null,
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        passwordValidator(),
        confirmValidator(),
      ],
    ],
  });

  registerUser() {
    const { name, email, password } = this.signupForm.value;
    const firstName = name.split(' ')[0];
    let lastName = name.split(' ')[1];

    if (!lastName) {
      lastName = 'xxxxx';
    }

    if (firstName && email && password) {
      this.unSub.add(
        this.authService
          .signup({ firstName, lastName, password, email })
          .subscribe(() => this.router.navigate(['/user']))
      );
    }
  }

  isVisisble(input: { type: string }) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
