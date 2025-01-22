import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, map, tap } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from 'app/components/user/services/user.service';
import { UserCardComponent } from './user-card/user-card.component';
import { UserInfo } from '@interfaces/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserCardComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  public users!: UserInfo[];
  private unSub = new Subscription();

  ngOnInit(): void {
    this.unSub.add(
      this.userService
        .getUsers()
        .pipe(
          tap((res: any) => {
            
            this.users = res;
          })
        )
        .subscribe()
    );
  }

  userDetail(id: string | undefined) {
    this.router.navigate(['/admin/users/', id]);
  }

  ngOnDestroy(): void {
    this.unSub.unsubscribe();
  }
}
