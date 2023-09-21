import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserDTO | null = null;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$
    .subscribe(data => {
      this.user = data;
    })
  }

}
