import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
} from '../../../utils/validators';
import { ErrorValidationComponent } from '../../error-validation/error-validation.component';
import { isValid } from '../../../utils/is-valid';

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
export class SignupComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
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
    if (name && email && password) {
      this.authService.signup({ name, password, email });
    }
  }

  isVisisble(input: { type: string }) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
