import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProductsAngular';
  imgRta = '';
  /**
   *
   */
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService
  ) { }

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

  login() {
    this.authService.login({
      userNameOrEmail: 'admin2',
      password: 'admin2'
    })
      .subscribe(rta => {
        console.log(rta.accessToken);
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
