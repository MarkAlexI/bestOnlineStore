import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { ErrorValidationComponent } from '../../error-validation/error-validation.component';
import { emailValidator } from '../../../utils/validators';
import { isValid } from '../../../utils/is-valid';
import { RecoverPassService } from '../../../services/signin-flow/recover-pass.service';

@Component({
  selector: 'app-recover-pass',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    ErrorValidationComponent,
  ],
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss'],
  providers: [{ provide: RecoverPassService, useClass: RecoverPassService }],
})
export class RecoverPassComponent {
  @Output() recover = new EventEmitter<boolean>();

  private readonly fb = inject(FormBuilder);
  private readonly recoverPass = inject(RecoverPassService);

  public readonly isValid = isValid;
  public recoverPass$!: Observable<string>;
  public notSend = true;

  public recoverPassForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, emailValidator()]],
  });

  onSubmit() {
    const email = this.recoverPassForm.get('email')?.value;

    if (email) {
      this.recoverPass.recoverPass(email);
      this.recoverPass$ = this.recoverPass.getRecoverRes();
      this.notSend = false;
      localStorage.setItem('recEmail', email);
    }
  }

  cancel() {
    this.recover.emit(false);
  }
}
