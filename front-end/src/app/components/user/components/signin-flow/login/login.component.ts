import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription, tap } from 'rxjs';

import { AuthService } from '../../../services/signin-flow/auth.service';
import { VisibilityIconComponent } from '@shared/components/icons/visibility-icon/visibility-icon.component';
import { GoogleLoginComponent } from '../google-login/google-login.component';
import {
  emailValidator,
  passwordValidator,
} from '../../../../../shared/utils/validators';
import { ErrorValidationComponent } from '../../../../../shared/components/error-validation/error-validation.component';
import { isValid } from '../../../../../shared/utils/is-valid';
import { RecoverPassComponent } from '../recover-pass/recover-pass.component';
import { NewPassComponent } from '../new-pass/new-pass.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    VisibilityIconComponent,
    GoogleLoginComponent,
    ErrorValidationComponent,
    RecoverPassComponent,
    NewPassComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private unSub!: Subscription;
  public readonly isValid = isValid;
  public recover = false;

  public isNewPass: boolean = false;

  public signinForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email, emailValidator()]],
    password: [null, [Validators.required, passwordValidator()]],
    savePass: [''],
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      const token = params.get('token');
      if (token) {
        this.isNewPass = true;
        localStorage.setItem('resToken', token);
      }
    });
  }

  onSubmit() {
    const { email, password } = this.signinForm.value;
    this.unSub = this.authService
      .signIn({ email, password })
      .subscribe(() => this.router.navigate(['/user']));
  }

  isVisisble(input: { type: string }) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  recoverPass(event: boolean) {
    this.recover = event;
  }

  newPass(event: boolean) {
    this.isNewPass = event;
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
