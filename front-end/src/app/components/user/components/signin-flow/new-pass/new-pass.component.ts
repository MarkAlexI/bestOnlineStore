import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ErrorValidationComponent } from '../../error-validation/error-validation.component';
import { isValid } from 'app/components/user/utils/is-valid';
import {
  confirmValidator,
  passwordValidator,
} from 'app/components/user/utils/validators';
import { RecoverPassService } from 'app/components/user/services/signin-flow/recover-pass.service';
import { VisibilityIconComponent } from '@shared/components/icons/visibility-icon/visibility-icon.component';
import { AlertService } from '@shared/services/interaction/alert.service';

@Component({
  selector: 'app-new-pass',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorValidationComponent,
    VisibilityIconComponent,
  ],
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss'],
  providers: [RecoverPassService],
})
export class NewPassComponent {
  @Output() isNewPass = new EventEmitter<boolean>();

  private readonly fb = inject(FormBuilder);
  private readonly setNewPassword = inject(RecoverPassService);
  private alertService = inject(AlertService);

  public recoverPass$!: Observable<string>;
  public isValid = isValid;
  public isRecover = true;

  public newPassForm = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        passwordValidator(),
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        confirmValidator(),
        passwordValidator(),
      ],
    ],
  });

  getEmail(): string | null {
    return localStorage.getItem('recEmail')
      ? localStorage.getItem('recEmail')
      : '';
  }

  onSubmit() {
    const password = this.newPassForm.get('password')?.value;
    const token = localStorage.getItem('resToken');

    if (password && token) {
      this.setNewPassword.setNewPass(token, password);
      this.recoverPass$ = this.setNewPassword.getRecoverRes();
      this.isRecover = false;
    } else {
      this.alertService.warning('Сталася помилка! Спробуйте ще раз!');
    }
  }

  cancel() {
    this.isNewPass.emit(false);
  }
  isVisisble(input: { type: string }) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
