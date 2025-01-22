import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Auth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  UserCredential,
  signOut,
} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { AlertService } from '@shared/services/interaction/alert.service';
import { AuthService } from '../../../services/signin-flow/auth.service';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit, OnDestroy {
  private readonly provider = new GoogleAuthProvider();
  private readonly auth: Auth = inject(Auth);
  private readonly alert = inject(AlertService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private unSub!: Subscription;

  ngOnInit(): void {
    if (!this.authService.isAuth()) {
      this.getStatus();
    }
  }

  googleLogin() {
    if (this.authService.isAuth()) {
      this.alert.warning("You've already logged in");
    } else {
      this.auth.languageCode = 'ua';
      signInWithRedirect(this.auth, this.provider);
    }
  }

  getStatus(): void {
    getRedirectResult(this.auth)
      .then((result: UserCredential | null) => {
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const gtoken = credential?.accessToken;

          if (gtoken) {
            this.unSub = this.authService.googleLogin(gtoken).subscribe(() => {
              this.router.navigate(['/user']);
            });
          }
        }
      })

      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error(errorCode, errorMessage);
        this.alert.danger('Login with Google', errorMessage);
      });
  }

  signOut(): void {
    signOut(this.auth)
      .then(() => {
        localStorage.clear();
        this.alert.success("You've signed out successfully!");
      })
      .catch((error) => {
        console.error(error.message);
        this.alert.danger('Google sign out', error.message);
      });
  }
  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }
}
