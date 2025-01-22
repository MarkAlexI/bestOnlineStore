import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserInfo } from '@interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user!: UserInfo;

  ngOnInit(): void {
  }
}
