import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ProductsAngular';
  imgRta = '';
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  createUser() {
    this.userService.create({
      userName: 'admin2',
      email: 'admin2@correo.com',
      password: 'admin2',
      entityId: '4cda4e2c-d452-4f87-aac4-b41fd6369ae2',
      rolId: '5ca77742-9da0-4665-9ad9-463ee5e6877c'
    })
      .subscribe(rta => {
        console.log(rta);
      })
  }

  getRols() {
    this.authService.getRols().subscribe(rta => {
      console.log(rta);
    })
  }

  downloadPdf() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
        .subscribe(rta => {
          this.imgRta = rta.location;
        })
    }
  }
}
