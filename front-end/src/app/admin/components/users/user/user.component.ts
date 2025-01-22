import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { UserCardComponent } from '../user-card/user-card.component';
import { UserInfo } from '@interfaces/user.interface';
import { UserService } from 'app/components/user/services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterLink, UserCardComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  public user$!: Observable<UserInfo>;

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.userService.getUserById(params.get('id')!)
      )
    );
  }
  edit() {
    console.log('click');
  }
}
