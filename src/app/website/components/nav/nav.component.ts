import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { CategoryDTO } from 'src/app/models/category.model';
import { UserDTO } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  categories: CategoryDTO[] = [];
  activeMenu = false;
  counter = 0;
  profile: UserDTO | null = null;
  counterSubscribe = 1;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length;
    });
    this.loadCategories();
    this.authService.user$
    .subscribe(user => {
      if (user) {
        this.profile = user;
      }
    });
  }

  ngOnChanges(){
    this.loadCategories();
  }

  toggleMenu(){
    this.activeMenu = !this.activeMenu;
  }

  login(){
    this.authService.loginAndGet('admin', 'admin')
    .subscribe(() => {
      this.router.navigate(['/profile']);
    })
  }

  loadCategories(){
    this.categoryService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
